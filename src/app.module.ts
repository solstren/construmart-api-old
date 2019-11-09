import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppConstants } from './utils/app-constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {} from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
// import { ModelsModule } from './models/models.module';
import { CategoriesModule } from './controllers/category/categories.module';
import { ProductModule } from './controllers/product/products.module';
import { ProductsController } from './controllers/product/products.controller';
import { MulterModule } from '@nestjs/platform-express';
import { InventoryModule } from './controllers/inventory/inventory.module';
import { InventoryController } from './controllers/inventory/inventory.controller';
import { InventoryService } from './controllers/inventory/services/inventory.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		CoreModule,
		ConfigModule,
		CategoriesModule,
		ProductModule,
		InventoryModule
	],
	controllers: [ AppController ],
	providers: [ AppService, InventoryService ]
})
export class AppModule {}
