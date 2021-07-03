import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule, Routes } from 'nest-router';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { GoogleOauthModule } from './auth/google/google-oauth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    // RESTful API
    path: '/api/v1',
    module: ApiModule,
    children: [
      { path: '/users', module: UsersModule },
      { path: '/auth', module: AuthModule },
      { path: '/google', module: GoogleOauthModule },
      { path: '/posts', module: PostsModule },
    ],
  },
];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot({
      isGlobal: true,
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
    PostsModule,
    // ViewModule, // order matters, GET '/*' should be last, so it renders next.js not found page
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
