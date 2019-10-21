import { AppConstants } from './utils/app-constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { } from 'module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle(AppConstants.SWAGGER_DOC_TITLE)
    .setDescription(AppConstants.SWAGGER_DOC_DESCRIPTION)
    .setVersion(AppConstants.SWAGGER_API_VERSION)
    .addTag(AppConstants.ADMIN_SWAGGER_TAG, AppConstants.ADMIN_SWAGGER_TAG_DESCRIPTION)
    .setSchemes('http')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1', app, swaggerDoc);

  app.enableCors();
  await app.listen(port);
  Logger.log(`App started at port => ${port}`);
}
bootstrap();
