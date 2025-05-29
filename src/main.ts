import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Active CORS ici
  app.enableCors({
    origin: ['http://localhost:3000', 'https://ilearning-tv.vercel.app'], // URLs frontend autorisées
    credentials: true,
  });

  // Récupération de l'environnement
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // Swagger seulement si pas en production
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('API iLearning-tv')
      .setDescription(
        'API iLearning-tv de gestion des vidéos, utilisateurs et streams',
      )
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('iLearningtv-api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  // Port et host
  const port = configService.get<number>('PORT', 3900);
  const host = configService.get<string>('HOST', '0.0.0.0');

  // 🔒 Global filter pour gérer toutes les exceptions
  app.useGlobalFilters(new AllExceptionsFilter());

  // 📋 Middleware pour logger toutes les requêtes entrantes
  app.use(LoggerMiddleware);

  try {
    await app.listen(port, host);

    const logger = new Logger('Bootstrap');
    logger.log(`🌐 Environment: ${nodeEnv}`);
    logger.log(`📡 Listening on http://${host}:${port}`);

    if (nodeEnv !== 'production') {
      logger.log(
        `🚀 Swagger docs available at: http://${host}:${port}/iLearningtv-api/docs`,
      );
    } else {
      logger.log(`🚫 Swagger disabled in production`);
    }
  } catch (error) {
    const logger = new Logger('Bootstrap');
    logger.error('❌ Failed to start the server', error);
    process.exit(1);
  }
}

bootstrap();
