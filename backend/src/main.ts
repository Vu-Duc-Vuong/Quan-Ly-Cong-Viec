import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );


  app.enableCors({

    origin: [
      'http://localhost:5173',
      'https://humble-capybara-v6q75wj4xjgw2xrp7-5173.app.github.dev'
    ],

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