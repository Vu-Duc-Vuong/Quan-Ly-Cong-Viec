import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );


  app.enableCors({

    origin: true,

    credentials: true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS'
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ],

  });



  // Cho phép truy cập ảnh trong backend/images
  app.useStaticAssets(

    join(__dirname, '..', 'images'),

    {
      prefix: '/images/'
    }

  );



  await app.listen(
    3000,
    '0.0.0.0'
  );


}


bootstrap();