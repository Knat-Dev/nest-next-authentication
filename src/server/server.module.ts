import { Module } from '@nestjs/common';
import { AppModule } from 'src/server/app/app.module';
import { ApiModule } from './app/api/api.module';
import { AuthModule } from './app/auth/auth.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [AppModule, ApiModule, AuthModule,ViewModule],
})
export class ServerModule {}
