import { Module } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { InventoryRepository } from './repository/inventory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';

@Module({
  controllers: [InventoryController],
  imports: [TypeOrmModule.forFeature([ InventoryRepository ]),],
  providers: [InventoryService]
})
export class InventoryModule {}
