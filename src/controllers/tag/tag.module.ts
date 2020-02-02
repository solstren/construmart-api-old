import { imageFileValidator } from './../../utils/image-validator';
import { editFileName } from './../../utils/edit-filename';
import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductsRepository } from '../product/repositories/products.repository';
import { CategoriesRepository } from '../category/repositories/categories.repository';
import { InventoryRepository } from '../inventory/repository/inventory.repository';
import { TagsService } from './services/tags.service';
import { TagsRepository } from './repositories/tags.repository';

@Module({
    controllers: [TagController],
    imports: [
        TypeOrmModule.forFeature([ProductsRepository, TagsRepository]),
        MulterModule.register({
            storage: diskStorage({ filename: editFileName, destination: './uploads' }),
            fileFilter: imageFileValidator
        })
    ],
    providers: [TagsService]
})
export class TagModule { }
