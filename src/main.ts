import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active CORS ici
  app.enableCors({
    origin: ['http://localhost:3000', 'https://ilearning-tv.vercel.app'], // Mets ici l'URL de ton frontend
    credentials: true,
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API iLearbubg-tv')
    .setDescription(
      'API iLearbubg-tv de gestion des videos, utilisateurs et streams',
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

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3900);
  const host = configService.get<string>('HOST', '0.0.0.0');

  // 🔒 Global filter pour gérer toutes les exceptions
  app.useGlobalFilters(new AllExceptionsFilter());

  // 🔁 Global interceptor pour structurer les réponses
  // app.useGlobalInterceptors(new ResponseInterceptor()); //deja appliquer dans le app.module.ts par convention (ne choisir que l'un des deux)

  // 📋 Middleware pour logger toutes les requêtes entrantes
  app.use(LoggerMiddleware);
  try {
    await app.listen(port, host);

    const logger = new Logger('Bootstrap');
    logger.log(
      `🚀 Application running on: ${await app.getUrl()}/iLearningtv-api/docs`,
    );
    logger.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.log(`📡 Listening on ${host}:${port}`);
  } catch (error) {
    const logger = new Logger('Bootstrap');
    logger.error('❌ Failed to start the server', error);
    process.exit(1);
  }
}
bootstrap();
