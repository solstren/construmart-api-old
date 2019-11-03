import { CategoriesRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../utils/edit-filename';
import { imageFileFilter } from '../../utils/image-filter';

@Module({
	controllers: [ CategoriesController ],
	imports: [
		TypeOrmModule.forFeature([ CategoriesRepository ]),
		MulterModule.register({
			storage: diskStorage({ filename: editFileName, destination: './uploads' }),
			fileFilter: imageFileFilter
		})
	],
	providers: [ CategoriesService ]
})
export class CategoriesModule {}
