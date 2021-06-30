import { Module } from '@nestjs/common';
import { AppModule } from 'src/server/app/app.module';
import { ViewModule } from 'src/server/view/view.module';
import { ApiModule } from './app/api/api.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [AppModule, ApiModule, AuthModule, ViewModule],
})
export class ServerModule {}
