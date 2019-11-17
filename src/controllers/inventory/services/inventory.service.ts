import { Injectable, NotFoundException, UnprocessableEntityException, HttpException, HttpStatus } from '@nestjs/common';
import { InventoryRepository } from '../repository/inventory.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../../../entities/inventory.entity';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { ObjectMapper } from '../../../utils/object-mapper';
import { ProductsRepository } from '../../../controllers/product/repositories/products.repository';
import { Product } from '../../../entities/product.entity';
import { ResponseMessages } from '../../../utils/response-messages';
import { InventoryRequestDto } from '../../../models/request-dto/inventory-request-dto';
import { InventoryResponse } from '../../../models/response-dto/inventory-response-dto';
import { InventoryHistoryRepository } from '../../../controllers/inventory-history/repositories/inventory-history.repository';

@Injectable()
export class InventoryService {
	constructor(
		@InjectRepository(InventoryRepository) private readonly _inventoryRepo: InventoryRepository,
		@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository,
		@InjectRepository(InventoryHistoryRepository) private readonly _inventoryHistoryRepo: InventoryHistoryRepository
	) {}

	async getInventoryByProductId(productId: number): Promise<BaseResponse> {
		const inventory = await this._inventoryRepo.getInventoryByProductId(productId);
		if (!inventory) throw new NotFoundException('Product is not tracked in inventory');
		const inventoryResponse: InventoryResponse = ObjectMapper.mapToInventoryResponse(inventory);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: inventoryResponse
		};
	}

	async getAllInventories(page: number, itemCount: number): Promise<BaseResponse> {
		const result: InventoryResponse[] = [];
		let inventories: Inventory[] = [];
		if (itemCount < 0) {
			inventories = await this._inventoryRepo.find({
				order: { id: 'ASC' },
				loadEagerRelations: true,
				relations: [ 'product' ],
				take: itemCount,
				skip: itemCount * ((page + 1) - 1)
			});
		} else {
			inventories = await this._inventoryRepo.find({
				order: { id: 'ASC' },
				loadEagerRelations: true,
				relations: [ 'product' ]
			});
		}

		if (inventories.length > 0) {
			inventories.forEach((inventory) => {
				result.push(ObjectMapper.mapToInventoryResponse(inventory));
			});
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: result
		};
	}

	async updateInventory(request: InventoryRequestDto, prodcuctId: number): Promise<BaseResponse> {
		var oldInventory = await this._inventoryRepo.getInventoryByProductId(prodcuctId);
		if (!oldInventory) throw new NotFoundException('Product is not tracked in inventory');
		const inventoryRequest: InventoryRequestDto = {
			initialQuantity: oldInventory.currentQuantity,
			initialPrice: oldInventory.currentPrice,
			currentQuantity: request.currentQuantity,
			currentPrice: request.currentPrice,
			productId: request.productId
		};
		const inventory = ObjectMapper.MapToInventoryEntity(inventoryRequest);
		const isUpdated = await this._inventoryRepo.updateInventory(inventory, prodcuctId);
		if (!isUpdated) throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
		const isInventoryHistoryUpdated = await this._inventoryHistoryRepo.updateInventoryHistory(
			oldInventory,
			prodcuctId
		);
		if (!isInventoryHistoryUpdated)
			throw new HttpException(ResponseMessages.UPDATE_INVENTORY_HISTORY_FAILURE, HttpStatus.NOT_MODIFIED);
		return {
			status: true,
			message: ResponseMessages.UPDATE_INVENTORY_SUCCESS,
			body: null
		};
	}
}
