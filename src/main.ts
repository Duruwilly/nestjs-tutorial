import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // NOTE: whenever nestjs encounter validation decorator, it will run the validation without me having to explicitly defining it in any controller or parameter
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();

// to create a new folder or module, you could use the nest cli - nest g module tasks
