import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { apiConfig } from './core/configs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      exposeUnsetFields: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableShutdownHooks();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  const config = new DocumentBuilder()
      .setTitle('Словарь Бажова API')
      .setDescription('API documentation for Словарь Бажова')
      .setVersion('1.0')
      .addApiKey(
          {
            type: 'apiKey',
            name: 'x-api-key',
            in: 'header',
          },
          'apiKey',
      )
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(apiConfig.port);

  const url = `http://localhost:${apiConfig.port}/${globalPrefix}`;
  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap();
