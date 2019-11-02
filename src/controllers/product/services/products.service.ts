import { UpdateCategoryDto } from './../../../models/request-dto/update-category-dto';
import { BaseResponse } from '../../../models/response-dto/base-response';
import {
	Injectable,
	NotFoundException,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	BadRequestException,
  NotImplementedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from '../repositories/products.repository';
import { ResponseMessages } from '../../../utils/response-messages';
import { Product } from '../../../entities/product.entity';
import { CreateProductDto } from '../../../models/request-dto/create-product-dto';

@Injectable()
export class ProductsService{

	constructor(@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository) {}

	async getProductById(id: number): Promise<BaseResponse> {
		const product: Product = await this._productRepo.findOne(id);
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
				order: { name: 'ASC' }
			});
		} catch (ex) {
			throw new InternalServerErrorException();
		}
		return {
			body: products,
			status: true,
			message: ResponseMessages.SUCCESS
		};
	}

	async createProduct(productReq: CreateProductDto): Promise<BaseResponse> {
		// check if category exists
		const duplicateCount = await this._productRepo.findAndCount({
			where: { name: { value: productReq.name } }
		});

		if (duplicateCount[1] >= 1) {
			throw new BadRequestException(ResponseMessages.PRODUCT_EXISTS);
		}
		const product = new Product();
		product.name = productReq.name;
		product.imageUrl = productReq.imageUrl;
		product.description = productReq.description;
		product.price = productReq.price;

		await this._productRepo.save(product);
		return {
			body: product,
			status: true,
			message: ResponseMessages.CREATE_PRODUCT_SUCCESS
		};
	}

	async updateProduct(request: Partial<UpdateCategoryDto>, id: number): Promise<BaseResponse> {
		const product = await this._productRepo.findOne(id);
		if (!product) {
			throw new NotFoundException(ResponseMessages.PRODUCT_DOES_NOT_EXIST);
		}
		// if (!request.rowVersion || request.rowVersion !== category.rowVersion) {
		//   throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
		// }
		const result = await this._productRepo.update({ id }, request);
		if (!result) {
			throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
		}
		return {
			body: null,
			status: true,
			message: ResponseMessages.UPDATE_PRODUCT_SUCCESS
		};
	}

	async deleteProduct(id: number): Promise<BaseResponse> {
		const category = await this._productRepo.findOne(id);
		if (!category) {
			throw new NotFoundException(`Product with id ${id} not found`);
		}
		await this._productRepo.remove(category);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: null
		};
	}

	async getCategoryProducts(id: number): Promise<BaseResponse> {
    throw new NotImplementedException();
  }
}
