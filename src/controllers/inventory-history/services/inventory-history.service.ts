import { Controller } from '@nestjs/common';
import { ResponseMessages } from '../../../utils/response-messages';
import { InventoryHistoryRepository } from '../repositories/inventory-history.repository';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { InventoryResponse } from '../../../models/response-dto/inventory-response-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectMapper } from '../../../utils/object-mapper';
import { InventoryHistory } from '../../../entities/inventory-history.entity';

@Controller('inventory-history')
export class InventoryHistoryService {
	constructor(
		@InjectRepository(InventoryHistoryRepository) private readonly _inventoryHistoryRepo: InventoryHistoryRepository
	) {}

	async getInventoryHistories(page: number, itemCount: number): Promise<BaseResponse> {
		let inventoryHistories: InventoryHistory[] = [];
		if (itemCount < 0) {
			inventoryHistories = await this._inventoryHistoryRepo.find({
				loadEagerRelations: true,
				relations: [ 'product' ]
			});
		} else {
			inventoryHistories = await this._inventoryHistoryRepo.find({
				loadEagerRelations: true,
				relations: [ 'product' ],
				take: itemCount,
				skip: itemCount * ((page + 1) - 1)
			});
		}

		let inventoryHistoryResponses: InventoryResponse[] = [];
		if (inventoryHistories.length > 0) {
			inventoryHistories.forEach((inventoryHistory) => {
				let inventoryHistoryResponse = ObjectMapper.mapToInventoryResponse(inventoryHistory);
				inventoryHistoryResponses.push(inventoryHistoryResponse);
			});
		}
		let count = await this._inventoryHistoryRepo.count();
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: {
				inventoryHistory: inventoryHistoryResponses,
				totalCount: count
			}
		};
	}
}
