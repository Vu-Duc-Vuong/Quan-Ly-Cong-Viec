import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  app.enableCors({

    origin: [
      // VS Code local
      "http://localhost:5173",

      // Github Codespace frontend
      "https://special-tribble-5gxp9576w64p3p79q-5173.app.github.dev",
      "https://obscure-cod-r4pv4wwv95663x59p-5173.app.github.dev",

      // Dev Tunnel frontend nếu dùng
      "https://37rxkxjr-5173.asse.devtunnels.ms"
    ],


    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],


    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],


    credentials: true

  });


  await app.listen(3000);

}


bootstrap();