import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );


  app.enableCors({

    origin: (origin, callback) => {

      if (
        !origin ||
        /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
        /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) ||
        /^https?:\/\/.*\.app\.github\.dev$/.test(origin) ||
        /^https?:\/\/.*\.github\.dev$/.test(origin) ||
        /^https?:\/\/.*\.devtunnels\.ms$/.test(origin)
      ) {
        callback(null, true);
      } 
      else {
        callback(new Error('Not allowed by CORS'));
      }

    },

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
  join(process.cwd(), 'images'),
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