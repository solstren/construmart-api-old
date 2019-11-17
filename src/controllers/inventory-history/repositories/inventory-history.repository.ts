import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { InventoryHistory } from '../../../entities/inventory-history.entity';

@EntityRepository(InventoryHistory)
export class InventoryHistoryRepository extends Repository<InventoryHistory> {
	async hasInventoryHistory(productId: number): Promise<boolean> {
		var inventoryCount = await this.createQueryBuilder('inventory_history')
			.where('inventory_history.product = :productId', {
				productId: productId
			})
			.getCount();
		if (inventoryCount <= 0) return false;
		return true;
	}

	async insertInventoryHistory(inventory: InventoryHistory): Promise<InventoryHistory> {
		const inventoryResult: InventoryHistory = await this.save(inventory);
		return inventoryResult;
	}

	async updateInventoryHistory(inventory: InventoryHistory, productId: number): Promise<boolean> {
		let result: UpdateResult;
		result = await this.createQueryBuilder()
			.update(InventoryHistory)
			.set({
				initialPrice: inventory.initialPrice,
				initialQuatity: inventory.initialQuatity,
				currentPrice: inventory.currentPrice,
				currentQuantity: inventory.currentQuantity
			})
			.where('product_id = :productId', { productId: productId })
			.execute();

		return result.affected ? true : false;
	}
}
