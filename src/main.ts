import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

// Load environment variables from .env
dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // global validation pipe for DTO validation (if needed)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // cross-origin requests
  const corsEnabled = process.env.CORS_ENABLED === 'true';
  if (corsEnabled) {
    app.enableCors();
  }

  // Implement graceful shutdown
  app.enableShutdownHooks();

  // Log successful app startup
  const port = process.env.PORT;
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
