import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule, Routes } from 'nest-router';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { SeedService } from 'src/server/console/seed.service';
import { ViewModule } from '../view/view.module';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoogleOauthModule } from './auth/google/google-oauth.module';
import { OrdersModule } from './orders/orders.module';
import { ThingsModule } from './things/things.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    // Next.JS SSR
    path: '',
    module: ViewModule,
  },
  {
    // RESTful API
    path: '/api/v1',
    module: ApiModule,
    children: [
      { path: '/users', module: UsersModule },
      { path: '/auth', module: AuthModule },
      { path: '/google', module: GoogleOauthModule },
    ],
  },

  // {
  //   // Next.JS SSR
  //   path: '/api/auth',
  //   module: NextAuthModule,
  // },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),
    ApiModule,
    ConsoleModule,
    AuthModule,
    UsersModule,
    ThingsModule,
    OrdersModule,
    ViewModule, // order matters, GET '/*' should be last, so it renders next.js not found page
  ],
  providers: [SeedService, AppService],
  controllers: [AppController],
})
export class AppModule {}
