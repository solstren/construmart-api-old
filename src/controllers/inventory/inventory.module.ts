import { Module } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { InventoryRepository } from './repository/inventory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { ProductModule } from '../product/products.module';
import { ProductsRepository } from '../product/repositories/products.repository';
import { InventoryHistoryRepository } from '../inventory-history/repositories/inventory-history.repository';

@Module({
  controllers: [InventoryController],
  imports: [TypeOrmModule.forFeature([ InventoryRepository, ProductsRepository, InventoryHistoryRepository ])],
  providers: [InventoryService]
})
export class InventoryModule {}
