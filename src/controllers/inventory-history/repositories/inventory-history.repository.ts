import { EntityRepository, Repository } from 'typeorm';
import { InventoryHistory } from '../../../entities/inventory-history.entity';

@EntityRepository(InventoryHistory)
export class InventoryHistoryRepository extends Repository<InventoryHistory> {
	async updateInventoryHistory(inventory: InventoryHistory, productId: number): Promise<boolean> {
		const result = await this.createQueryBuilder('inventoryHistory')
			.update(InventoryHistory)
			.set({ 
				initialPrice: inventory.initialPrice,
				initialQuatity: inventory.initialQuatity,
				currentPrice: inventory.currentPrice,
				currentQuantity: inventory.currentQuantity
			})
			.where('inventory.product = :productId', { productId: productId })
			.execute();
		return result.affected ? true : false;
	}
}