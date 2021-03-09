import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`)
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUnintialalized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      }
    })
  );
  app.use(passport.initalize());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
