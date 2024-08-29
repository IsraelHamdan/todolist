/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN'),
    methods: config.get<string>('ALLOWED_METHODS'),
    allowedHeaders: config.get<string>('ALLOWED_HEADERS'),
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
