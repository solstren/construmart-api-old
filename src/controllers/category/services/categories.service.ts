import { CategoryRequestDto } from '../../../models/request-dto/category-request-dto';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { Category } from '../../../entities/category.entity';
import {
	Injectable,
	NotFoundException,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	BadRequestException,
	NotImplementedException,
	UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../repositories/categories.repository';
import { ResponseMessages } from '../../../utils/response-messages';
import { FileUploadRequest } from '../../../models/request-dto/file-upload-request';
import { Product } from '../../../entities/product.entity';
import { CategoryResponseDto } from '../../../models/response-dto/category-response-dto';
import { ObjectMapper } from '../../../utils/object-mapper';
import { validate } from '@babel/types';
import { UpdateResult } from 'typeorm';
import { ProductsRepository } from '../../../controllers/product/repositories/products.repository';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(CategoriesRepository) private readonly _categoryRepo: CategoriesRepository,
		@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository
	) {}

	async getCategoryById(id: number): Promise<BaseResponse> {
		let category: Category;
		category = await this._categoryRepo.findOne(id, { loadRelationIds: true });
		if (!category) {
			throw new NotFoundException(`Category with id '${id}' not found`);
		}
		return {
			body: category,
			status: true,
			message: 'success'
		};
	}

	async getAllCategories(): Promise<BaseResponse> {
		let categories: Category[];
		categories = await this._categoryRepo.find({
			order: { name: 'ASC' },
			loadRelationIds: true
		});
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: categories
		};
	}

	async getProductsByCategory(categoryId: number): Promise<BaseResponse> {
		const products = await this._productRepo.getProductsByCategoryId(categoryId);
		if (!products) throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: products
		};
	}

	async getProductByCategory(categoryId: number, productId: number): Promise<BaseResponse> {
		const product = await this._productRepo.getProductByCategoryId(categoryId, productId);
		if (!product) throw new NotFoundException(ResponseMessages.PRODUCT_DOES_NOT_EXIST_IN_CATEGORY);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: product
		};
	}

	async createCategory(categoryReq: CategoryRequestDto, file: FileUploadRequest): Promise<BaseResponse> {
		let category: Category;
		// check if category exists
		const duplicateCount = await this._categoryRepo.findAndCount({
			where: { name: { value: categoryReq.name } }
		});

		if (duplicateCount[1] >= 1) {
			throw new UnprocessableEntityException(ResponseMessages.CATEGORY_EXISTS);
		}
		category = new Category();
		category.name = categoryReq.name;
		category.imageName = file.filename || null;
		category.description = categoryReq.description;

		await this._categoryRepo.save(category);
		if (category.id <= 0) {
			throw new UnprocessableEntityException('Failed to create category');
		}
		return {
			status: true,
			message: ResponseMessages.CREATE_CATEGORY_SUCCESS,
			body: category
		};
	}

	async updateCategory(
		id: number,
		file: FileUploadRequest,
		request: Partial<CategoryRequestDto>
	): Promise<BaseResponse> {
		const category = await this._categoryRepo.findOne(id);
		if (!category) {
			throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
		}
		category.name = request.name || category.name;
		category.description = request.description || category.description;
		category.imageName = file ? file.filename : category.imageName;

		const result: Category = await this._categoryRepo.save(category);
		if (!result) {
			throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
		}
		return {
			status: true,
			message: ResponseMessages.UPDATE_CATEGORY_SUCCESS,
			body: null
		};
	}

	async deleteCategory(id: number): Promise<BaseResponse> {
		const category = await this._categoryRepo.findOne(id);
		if (!category) {
			throw new NotFoundException(`Category with id ${id} not found`);
		}
		await this._categoryRepo.remove(category);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: null
		};
	}
}
