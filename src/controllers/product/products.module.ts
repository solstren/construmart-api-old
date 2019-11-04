import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { CategoriesRepository } from '../category/repositories/categories.repository';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductsRepository, CategoriesRepository])],
  providers: [ProductsService]
})
export class ProductModule {}
