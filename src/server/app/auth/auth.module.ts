import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule, GoogleOauthModule, JwtAuthModule],
})
export class AuthModule {}
