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
import { TypeormConfigService } from './config/typeorm-config.service';
import { CategoriesModule } from './controllers/category/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CoreModule,
    ConfigModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TypeormConfigService,
  ],
})
export class AppModule { }
