import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  providers: [ProductsService]
})
export class ProductModule {}
