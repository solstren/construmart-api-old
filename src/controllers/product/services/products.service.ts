import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { ResponseMessages } from '../../../utils/response-messages';

@Injectable()
export class ProductsService {
	constructor(@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository) {}

	async getProductById(id: number): Promise<BaseResponse> {
		let product: Product;
		try {
			product = await this._productRepo.findOne(id, { loadEagerRelations: true });
			if (!product) {
				throw new NotFoundException(`Product with id '${id}' not found`);
			}
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
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
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: products
		};
	}

	async deleteProduct(id: number): Promise<BaseResponse> {
		try {
			const product = await this._productRepo.findOne(id);
			if (!product) {
				throw new NotFoundException(`Product with id ${id} not found`);
			}
			await this._productRepo.remove(product);
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: null
		};
	}

	// async createProduct(categoryReq: CategoryRequestDto, file: FileUploadRequest): Promise<BaseResponse> {
	// 	let category: Category;
	// 	try {
	// 		// check if category exists
	// 		const duplicateCount = await this._categoryRepo.findAndCount({
	// 			where: { name: { value: categoryReq.name } }
	// 		});

	// 		if (duplicateCount[1] >= 1) {
	// 			throw new UnprocessableEntityException(ResponseMessages.CATEGORY_EXISTS);
	// 		}
	// 		category = new Category();
	// 		category.name = categoryReq.name;
	// 		category.imageName = file.filename || null;
	// 		category.description = categoryReq.description;

	// 		await this._categoryRepo.save(category);
	// 	} catch (error) {
	// 		throw new InternalServerErrorException(ResponseMessages.ERROR);
	// 	}
	// 	return {
	// 		body: category,
	// 		status: true,
	// 		message: ResponseMessages.CREATE_CATEGORY_SUCCESS
	// 	};
	// }
}
