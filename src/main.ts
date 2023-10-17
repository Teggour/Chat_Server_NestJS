import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set prefix to API
  app.setGlobalPrefix('api');

  // Cors
  app.enableCors({
    origin: '*',
  });

  // Config Service
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT') || 3333;

  await app.listen(PORT);

  // onStart Log
  Logger.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
