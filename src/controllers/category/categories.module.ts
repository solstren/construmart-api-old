import { CategoriesRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../utils/edit-filename';
import { imageFileValidator } from '../../utils/image-validator';
import { ProductsRepository } from '../product/repositories/products.repository';

@Module({
	controllers: [ CategoriesController ],
	imports: [
		TypeOrmModule.forFeature([ CategoriesRepository, ProductsRepository]),
		MulterModule.register({
			storage: diskStorage({ filename: editFileName, destination: './uploads' }),
			fileFilter: imageFileValidator
		})
	],
	providers: [ CategoriesService ]
})
export class CategoriesModule {}
