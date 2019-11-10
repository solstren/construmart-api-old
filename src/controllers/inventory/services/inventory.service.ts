import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InventoryRepository } from '../repository/inventory.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../../../entities/inventory.entity';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { ObjectMapper } from '../../../utils/object-mapper';
import { ProductsRepository } from '../../../controllers/product/repositories/products.repository';
import { Product } from '../../../entities/product.entity';
import { ResponseMessages } from '../../../utils/response-messages';
import { InventoryRequestDto } from '../../../models/request-dto/inventory-request-dto';

@Injectable()
export class InventoryService {
	constructor(
		@InjectRepository(InventoryRepository) private readonly _inventoryRepo: InventoryRepository,
		@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository
	) {}

	async getInventoryByProductId(productId: number): Promise<BaseResponse> {
		const inventory = await this._inventoryRepo.getInventoryByProductId(productId);
		if (!inventory) throw new NotFoundException('Product is not tracked in inventory');
		const inventoryResponse = ObjectMapper.mapToInventoryResponse(inventory);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: inventoryResponse
		};
	}

	async addProductToInvetory(request: InventoryRequestDto): Promise<BaseResponse> {
		var product = await this._productRepo.findOne(request.productId);
		if (!product) throw new UnprocessableEntityException('product does not exist');
		let inventory: Inventory = ObjectMapper.MapToInventoryEntity(request);
		inventory.product = product;
		const isExist: boolean = await this._inventoryRepo.hasInventory(inventory);
		console.log(`isExist ==> ${isExist}`);
		if (isExist) {
			throw new UnprocessableEntityException(`Product '${product.name}' already exists in inventory`);
		}
		const inventoryResult = await this._inventoryRepo.insertInventory(inventory);
		const result = ObjectMapper.mapToInventoryResponse(inventoryResult);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: result
		};
	}
}
