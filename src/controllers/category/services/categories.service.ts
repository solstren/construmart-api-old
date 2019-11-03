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

@Injectable()
export class CategoriesService {
	constructor(@InjectRepository(CategoriesRepository) private readonly _categoryRepo: CategoriesRepository) {}

	async getCategoryById(id: number): Promise<BaseResponse> {
		let response: CategoryResponseDto;
		try {
			const category = await this._categoryRepo.findOne(id, { relations: [ 'products' ] });
			console.log(`category => ${category}`);
			if (!category) {
				throw new NotFoundException(`Category with id '${id}' not found`);
			}
			response = ObjectMapper.mapToCategoryResponse(category);
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			body: response,
			status: true,
			message: 'success'
		};
	}

	async getAllCategories(): Promise<BaseResponse> {
		let categoryResponse: CategoryResponseDto[];
		try {
			const categories: Category[] = await this._categoryRepo.find({
				order: { name: 'ASC' }, relations: ['products']
			});
			categories.forEach((value, index, array) => {
				var response = ObjectMapper.mapToCategoryResponse(value);
				categoryResponse.push(response);
				console.log(response);
			});
		} catch (ex) {
			throw new InternalServerErrorException();
		}
		return {
			body: categoryResponse,
			status: true,
			message: ResponseMessages.SUCCESS
		};
	}

	async getProductsByCategory(categoryId: number): Promise<BaseResponse> {
		let products: Product[];
		try {
			const category = await this._categoryRepo.findOne(categoryId, { relations: [ 'products' ] });
			if (!category) throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
			products = category.products.sort();
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: products
		};
	}

	async getProductByCategory(categoryId: number, productId: number): Promise<BaseResponse> {
		let product: Product;
		try {
			const category = await this._categoryRepo.findOne(categoryId, { relations: [ 'products' ] });
			if (!category) throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
			product = category.products.find((value, index, obj) => value.id === productId);
			if (!product) throw new NotFoundException(ResponseMessages.PRODUCT_DOES_NOT_EXIST_IN_CATEGORY);
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: product
		};
	}

	async createCategory(categoryReq: CategoryRequestDto, file: FileUploadRequest): Promise<BaseResponse> {
		let category: Category;
		try {
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
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			body: category,
			status: true,
			message: ResponseMessages.CREATE_CATEGORY_SUCCESS
		};
	}

	async updateCategory(
		id: number,
		file: FileUploadRequest,
		request: Partial<CategoryRequestDto>
	): Promise<BaseResponse> {
		try {
			const category = await this._categoryRepo.findOne(id);
			if (!category) {
				throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
			}
			// if (!request.rowVersion || request.rowVersion !== category.rowVersion) {
			//   throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
			// }
			request.imageFileName = file.filename;
			const result: UpdateResult = await this._categoryRepo.update({ id }, request);
			if (!result) {
				throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
			}
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			body: null,
			status: true,
			message: ResponseMessages.UPDATE_CATEGORY_SUCCESS
		};
	}

	async deleteCategory(id: number): Promise<BaseResponse> {
		try {
			const category = await this._categoryRepo.findOne(id);
			if (!category) {
				throw new NotFoundException(`Category with id ${id} not found`);
			}
			await this._categoryRepo.remove(category);
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: null
		};
	}
}
