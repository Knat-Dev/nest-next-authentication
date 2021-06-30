import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get()
  async auth(@Res() res) {
    return res.redirect('/api/v1/google/auth');
  }
}
