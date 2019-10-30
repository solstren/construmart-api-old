import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppConstants } from './utils/app-constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
// import { ModelsModule } from './models/models.module';
import { CategoriesModule } from './controllers/category/categories.module';
import { ProductModule } from './controllers/product/products.module';
import { ProductsController } from './controllers/product/products.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CoreModule,
    ConfigModule,
    CategoriesModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
