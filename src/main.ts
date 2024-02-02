// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.useGlobalPipes(new ValidationPipe());

//   await app.listen(4000);
// }
// bootstrap();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: '*',
    credentials: true,
  });
  // Utilisation du global pipe de validation
  app.useGlobalPipes(new ValidationPipe());

  // Démarrage du serveur sur le port 4000
  await app.listen(4000);
}

bootstrap();
