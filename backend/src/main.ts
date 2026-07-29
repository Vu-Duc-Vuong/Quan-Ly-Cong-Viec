import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// Nếu đã tạo Exception Filter thì bỏ comment dòng dưới
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
app.useGlobalFilters(
  new HttpExceptionFilter()
);
  // Validation toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu gửi field không hợp lệ
      transform: true, // Tự động chuyển kiểu dữ liệu
    }),
  );

  // Exception Filter toàn cục (thêm khi đã tạo filter)
  // app.useGlobalFilters(new HttpExceptionFilter());

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
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Cho phép truy cập ảnh trong backend/images
  app.useStaticAssets(join(process.cwd(), 'images'), {
    prefix: '/images/',
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();