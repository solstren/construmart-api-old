import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { CategoriesRepository } from '../category/repositories/categories.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../utils/edit-filename';
import { imageFileValidator } from '../../utils/image-validator';
import { InventoryRepository } from '../inventory/repository/inventory.repository';

@Module({
	controllers: [ ProductsController ],
	imports: [
		TypeOrmModule.forFeature([ ProductsRepository, CategoriesRepository, InventoryRepository]),
		MulterModule.register({
			storage: diskStorage({ filename: editFileName, destination: './uploads' }),
			fileFilter: imageFileValidator
		})
	],
	providers: [ ProductsService ]
})
export class ProductModule {}
