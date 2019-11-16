import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryHistoryRepository } from './repositories/inventory-history.repository';
import { InventoryHistoryController } from './inventory-history.controller';
import { InventoryHistoryService } from './services/inventory-history.service';

@Module({
  controllers: [InventoryHistoryController],
  imports: [TypeOrmModule.forFeature([InventoryHistoryRepository])],
  providers: [InventoryHistoryService]
})
export class InventoryHistoryModule {}
