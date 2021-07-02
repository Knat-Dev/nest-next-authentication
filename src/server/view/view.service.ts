import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';
import { IncomingMessage, ServerResponse } from 'node:http';
import { UsersService } from '../app/users/users.service';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    console.log(this.configService.get<string>('NODE_ENV'));
  }

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: this.configService.get<string>('NODE_ENV') !== 'production',
        dir: './src/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }

  async handler(
    req: IncomingMessage,
    res: ServerResponse,
    options?: {
      data?: any;
      url?: string;
    },
  ) {
    await this.getNextServer().render(
      req,
      res,
      options?.url || req.url,
      Object.assign({}, options?.data),
    );
  }

}
