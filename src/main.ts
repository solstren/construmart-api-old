import { AppConstants } from './utils/app-constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { } from 'module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { AppValidationPipe } from './shared/app-validation.pipe';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle(AppConstants.SWAGGER_DOC_TITLE)
    .setDescription(AppConstants.SWAGGER_DOC_DESCRIPTION)
    .setVersion(AppConstants.SWAGGER_API_VERSION)
    .addTag(AppConstants.SWAGGER_ADMIN_TAG, AppConstants.SWAGGER_ADMIN_TAG_DESCRIPTION)
    .addTag(AppConstants.SWAGGER_CUSTOMER_TAG, AppConstants.SWAGGER_CUSTOMER_TAG_DESCRIPTION)
    .setSchemes('https', 'http')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, swaggerDoc);

  app.enableCors();
  await app.listen(port);
  Logger.log(`App started at port => ${port}`);
}
bootstrap();
