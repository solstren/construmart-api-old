import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../../../entities/product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
	async getProductByCategoryId(categoryId: number, productId: number): Promise<Product> {
		const product = await this.createQueryBuilder('products')
			.where('products.category = :categoryId', { categoryId: categoryId })
            .getOne();
            console.log(product);
		return product;
	}

	async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
		const products = await this.createQueryBuilder('products')
			.where('products.category = :categoryId', { categoryId: categoryId })
            .getMany();
		return products;
	}
}
