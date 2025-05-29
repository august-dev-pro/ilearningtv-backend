import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'src/auth/services/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from 'src/user/infrastructure/services/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
