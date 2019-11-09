import { Inventory } from '../../../entities/inventory.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
	async getInventoryByProductId(productId: number): Promise<Inventory> {
		const inventory = await this.createQueryBuilder('inventory')
			.leftJoinAndSelect('inventory.product', 'product')
			.where('inventory.productId = :productId', { productId: productId })
			.getOne();
		return inventory;
	}
}
