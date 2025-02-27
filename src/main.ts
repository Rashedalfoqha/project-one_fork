import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';

import helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';
import { json, urlencoded } from 'express';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(helmet());

  // Enable request compression for performance
  app.use(compression());

  // Request size limits (Prevent DoS attacks)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Global Validation Pipes (Sanitization & DTO validation)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Auto-transform DTOs
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Block extra fields
    }),
  );

  // Enable CORS
  if (process.env.CORS_ENABLED === 'true') {
    app.enableCors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
  }

  // CSRF Protection (Prevent Cross-Site Request Forgery)
  app.use(csurf());

  // Enforce HTTPS Redirection (If behind a proxy)
  app.use((req, res, next) => { 
    if (!req.secure && process.env.FORCE_HTTPS === 'true') {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  });

  // Enable Graceful Shutdown Hooks
  app.enableShutdownHooks();

  // Log successful app startup
  const port = process.env.PORT;
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();

/*
//Notes related to security adding logic! 
Helmet - Secures HTTP headers
CORS - Restricts cross-origin requests
CSRF Protection - Blocks unauthorized state-changing requests
Request Compression - Optimizes performance
Request Size Limits - Prevents DoS attacks
Validation & DTO Enforcement - Blocks invalid data
Enforce HTTPS - Redirects HTTP to HTTPS
Graceful Shutdown - Handles process termination safely
*/
