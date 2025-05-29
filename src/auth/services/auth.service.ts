import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from 'src/user/application/dtos/user.dto';
import { LoginCredentialDto } from 'src/user/application/dtos/loginCredential.dto';
import { RefreshTokenDto } from 'src/user/application/dtos/refreshToken.dto';
import { SendOtpDto } from 'src/user/application/dtos/sendOtp.dto';
import { VerifyOtpDto } from 'src/user/application/dtos/verifyOtp.dto';
import { ForgotPasswordDto } from 'src/user/application/dtos/forgotPassword.dto';
import { ResetPasswordDto } from 'src/user/application/dtos/resetPassword.dto';
import { UserService } from 'src/user/infrastructure/services/user.service';

@Injectable()
export class AuthService {
  private refreshTokens = new Map<string, string>();
  private otps = new Map<string, string>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // 🔒 Hasher le mot de passe utilisateur
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // 🧪 Comparer un mot de passe en clair avec un hash
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // 🧾 Inscription (register)
  async register(dto: CreateUserDto): Promise<{ message: string }> {
    const existing = await this.userService.getAll();
    if (existing.find((user) => user.getEmail() === dto.email)) {
      throw new ConflictException('Email already in use');
    }

    const password = await this.hashPassword(dto.password);
    await this.userService.create({ ...dto, password });

    return { message: 'Registration successful' };
  }

  // 🔑 Connexion (login)
  async login(dto: LoginCredentialDto) {
    const users = await this.userService.getAll();
    const user = users.find((u) => u.getEmail() === dto.email);
    if (
      !user ||
      !(await this.comparePassword(dto.password, user.getPassword()))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.getId(), email: user.getEmail() };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    this.refreshTokens.set(user.getId(), refreshToken);

    return { accessToken, refreshToken };
  }

  // 🔁 Rafraîchir un token d'accès
  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken);
      const stored = this.refreshTokens.get(payload.sub);
      if (stored !== dto.refreshToken) throw new UnauthorizedException();

      const accessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { expiresIn: '15m' },
      );
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // 🚪 Déconnexion
  async logout(dto: RefreshTokenDto) {
    const payload = this.jwtService.verify(dto.refreshToken);
    this.refreshTokens.delete(payload.sub);
    return { message: 'Logged out successfully' };
  }

  // 📲 Envoyer un OTP
  async sendOtp(dto: SendOtpDto) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otps.set(dto.email, otp);
    console.log(`[OTP] for ${dto.email} is ${otp}`);
    return { message: 'OTP sent' };
  }

  // ✅ Vérifier un OTP
  async verifyOtp(dto: VerifyOtpDto) {
    const valid = this.otps.get(dto.email);
    if (valid === dto.otp) {
      this.otps.delete(dto.email);
      return { message: 'OTP verified' };
    }
    throw new UnauthorizedException('Invalid OTP');
  }

  // 📬 Mot de passe oublié
  async forgotPassword(dto: ForgotPasswordDto) {
    const users = await this.userService.getAll();
    const user = users.find((u) => u.getEmail() === dto.email);
    if (!user) throw new NotFoundException('User not found');

    const token = uuidv4();
    console.log(`[ResetToken] for ${dto.email} is ${token}`);
    return { message: 'Reset token sent' };
  }

  // 🔄 Réinitialiser le mot de passe
  async resetPassword(dto: ResetPasswordDto) {
    const users = await this.userService.getAll();
    const user = users.find((u) => u.getEmail() === dto.email);
    if (!user) throw new UnauthorizedException('Invalid reset token');

    const password = await this.hashPassword(dto.newPassword);
    await this.userService.update(user.getId(), { password });

    return { message: 'Password reset successful' };
  }

  // 👤 Obtenir le profil
  async getProfile(user: any) {
    const found = await this.userService.getById(user.userId);
    if (!found) throw new NotFoundException('User not found');
    const email = found.getEmail();
    return { email: email };
  }

  // 🔧 Générer un token manuellement
  generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
