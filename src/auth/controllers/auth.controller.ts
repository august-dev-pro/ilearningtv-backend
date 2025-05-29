import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from "src/auth/services/auth.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateUserDto } from 'src/user/application/dtos/user.dto';
import { LoginCredentialDto } from 'src/user/application/dtos/loginCredential.dto';
import { RefreshTokenDto } from 'src/user/application/dtos/refreshToken.dto';
import { SendOtpDto } from 'src/user/application/dtos/sendOtp.dto';
import { VerifyOtpDto } from 'src/user/application/dtos/verifyOtp.dto';
import { ForgotPasswordDto } from 'src/user/application/dtos/forgotPassword.dto';
import { ResetPasswordDto } from 'src/user/application/dtos/resetPassword.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 📝 Créer un compte utilisateur (👤)
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  // 🔐 Connexion utilisateur (🔑)
  @Post('login')
  async login(@Body() body: LoginCredentialDto) {
    return this.authService.login(body);
  }

  // ♻️ Rafraîchir le token d'accès (🔁)
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }

  // 🚪 Déconnexion utilisateur (🚫)
  @Post('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body);
  }

  // 📤 Envoyer un OTP au mail (📧)
  @Post('send-otp')
  async sendOtp(@Body() body: SendOtpDto) {
    return this.authService.sendOtp(body);
  }

  // ✅ Vérifier l'OTP envoyé (✔️)
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }

  // 🔁 Mot de passe oublié (📨)
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  // 🔄 Réinitialiser le mot de passe (🔓)
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  // 👤 Obtenir le profil utilisateur connecté (🧑‍💼)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    if (req.user) return this.authService.getProfile(req.user);
  }
}

