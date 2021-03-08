import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  //.env 사용하기 위해 nestjs에서 제공하는 것 사용
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
