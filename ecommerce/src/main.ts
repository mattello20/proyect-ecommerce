import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './Middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('ECOMMERCE API')
    .setDescription('Proyecto Integrador M4-Back Mattello20')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(LoggerGlobalMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('Server listening on http://localhost:3000');
}
bootstrap();
