import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../app/auth/jwt/jwt-auth.guard';
import { UsersService } from '../app/users/users.service';
import { PublicGuard } from './public.guard';
import { ViewAuthFilter } from './view.auth.filter';
import { ViewService } from './view.service';
import { ViewUnauthFilter } from './view.unauth.filter';

@Controller()
export class ViewController {
  constructor(
    private viewService: ViewService,
    private usersService: UsersService,
  ) {}

  @Get('/')
  public async renderHomePage(@Req() req: Request, @Res() res: Response) {
    // able to fetch user relevant data on protected routes
    const serverSideProps = { dataFromController: '1234' };

    await this.viewService.handler(req, res, {
      data: serverSideProps,
      url: '/home', // next.js page to render
    });
  }

  @UseGuards(PublicGuard)
  @UseFilters(ViewUnauthFilter)
  @Get('login')
  public async renderLoginPage(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get('profile')
  public async renderProfilePage(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('*')
  public async notFound(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
