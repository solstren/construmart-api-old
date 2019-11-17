import { Inventory } from '../../../entities/inventory.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InventoryRequestDto } from '../../../models/request-dto/inventory-request-dto';
import { Product } from '../../../entities/product.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
	async getInventoryByProductId(productId: number): Promise<Inventory> {
		const inventory = await this.createQueryBuilder('inventory')
			.leftJoinAndSelect('inventory.product', 'product')
			.where('inventory.product = :productId', { productId: productId })
			.getOne();
		return inventory;
	}

	async hasInventory(inventory: Inventory): Promise<boolean> {
		var inventoryCount = await this.createQueryBuilder('inventory')
			.where('inventory.product = :productId', {
				productId: inventory.product.id
			})
			.getCount();
		if (inventoryCount <= 0) return false;
		return true;
	}

	async insertInventory(inventory: Inventory): Promise<Inventory> {
		const inventoryResult: Inventory = await this.save(inventory);
		return inventoryResult;
	}

	async updateInventory(inventory: Inventory, productId: number): Promise<boolean> {
		const result = await this.createQueryBuilder()
			.update(Inventory)
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
