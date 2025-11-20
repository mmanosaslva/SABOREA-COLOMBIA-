import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔧 CONFIGURACIÓN SWAGGER
  const config = new DocumentBuilder()
    .setTitle('🍽️ Saborea Colombia API')
    .setDescription('API para la gestión gastronómica de Colombia')
    .setVersion('1.0')
    .addBearerAuth( 
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa tu token JWT',
        in: 'header',
      },
      'JWT-auth', // Este nombre debe coincidir con @ApiBearerAuth('JWT-auth')
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Saborea Colombia API',
    swaggerOptions: {
      persistAuthorization: true, // Mantiene el token entre sesiones
    },
  });

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  // Validación automática de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS habilitado 
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`
╔════════════════════════════════════════╗
║  🚀 Saborea Colombia API              ║
║  📍 http://localhost:${port}           ║
║  📚 http://localhost:${port}/api/docs  ║
╚════════════════════════════════════════╝
  `);
}

bootstrap();