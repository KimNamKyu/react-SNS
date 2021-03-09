import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  //.env 사용하기 위해 nestjs에서 제공하는 것 사용
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot()],  //forRoot 설정을 넣어주기위해 
  controllers: [AppController],
  providers: [AppService],  //providers에 연결되 있는것을 보고 DI 의존성주입을 해준다.
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
