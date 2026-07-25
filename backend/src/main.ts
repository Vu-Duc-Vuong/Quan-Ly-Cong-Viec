import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {

  const app = await NestFactory.create(AppModule);



  app.enableCors({

    origin: [
      "https://special-tribble-5gxp9576w64p3p79q-5173.app.github.dev"
    ],

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    ],

    credentials: true

  });



  await app.listen(3000);

}


bootstrap();