import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  async auth(@Res() res) {
    return res.redirect('/api/v1/google/auth');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@GetUser() user: User) {
    return this.authService.me(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Res() res: Response) {
    res.cookie('jwt', '');
    return res.redirect("/login");
  }
}
