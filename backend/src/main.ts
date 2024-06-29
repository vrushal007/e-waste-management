import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sunbots Blind Assistance API')
    .setDescription('The Sunbots Blind Assistance API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'Bearer',
      in: 'header',
      name: 'Authorization',
    })
    .addServer('http://localhost:' + process.env.PORT)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  app.enableCors({ origin: '*' });
  SwaggerModule.setup('docs', app, document);
  app.use(helmet());
  

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
