import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  // COOKIE PARSER

  app.use(cookieParser());


  // CORS

  app.enableCors({

    origin: 'http://localhost:7000',

    credentials: true,

  });


  await app.listen(process.env.PORT ?? 5000);

}

bootstrap();