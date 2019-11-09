import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from '../repository/inventory.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../../../entities/inventory.entity';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { ObjectMapper } from '../../../utils/object-mapper';
import { ProductsRepository } from '../../../controllers/product/repositories/products.repository';
import { Product } from '../../../entities/product.entity';
import { ResponseMessages } from '../../../utils/response-messages';

@Injectable()
export class InventoryService {
    constructor(@InjectRepository(InventoryRepository) private readonly _inventoryRepo: InventoryRepository,
    @InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository,) {}

    async getInventoryByProductId(productId: number): Promise<BaseResponse> {
        const inventory = await this._inventoryRepo.getInventoryByProductId(productId);
        if (!Inventory) throw new NotFoundException('Product is not tracked in inventory');
        const inventoryResponse = ObjectMapper.mapToInventoryResponse(inventory);
        return {
            status: true,
            message: ResponseMessages.SUCCESS,
            body: inventoryResponse
        };
    }
}