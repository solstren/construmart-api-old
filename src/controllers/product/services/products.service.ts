import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { ResponseMessages } from '../../../utils/response-messages';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository) {}

	getProductById(id: number): BaseResponse | PromiseLike<BaseResponse> {
		const product = this._productRepo.findOne(id, { loadEagerRelations: true });
		if (!product) {
			throw new NotFoundException(`Product with id '${id}' not found`);
		}
		return {
			body: product,
			status: true,
			message: 'success'
		};
	}

	async getAllProducts(): Promise<BaseResponse> {
		let products: Product[];
		try {
			products = await this._productRepo.find({
				order: { name: 'ASC' },
				loadEagerRelations: true
			});
		} catch (ex) {
			throw new InternalServerErrorException();
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: products
		};
	}

	async deleteProduct(id: number): Promise<BaseResponse> {
		const product = await this._productRepo.findOne(id);
		if (!product) {
			throw new NotFoundException(`Product with id ${id} not found`);
		}
		await this._productRepo.remove(product);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: null
		};
	}
}
