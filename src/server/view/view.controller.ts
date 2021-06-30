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
import { ViewAuthFilter } from './view.auth.filter';
import { ViewService } from './view.service';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('/')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    // able to fetch user relevant data on protected routes
    const serverSideProps = { dataFromController: '1234' };

    await this.viewService.handler(
      req,
      res,
      serverSideProps,
      '/home', // next.js page to render
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get('profile')
  public async showProfile(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  public async indexOrders(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);

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
