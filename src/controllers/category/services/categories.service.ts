import { UpdateCategoryDto } from './../../../models/request-dto/update-category-dto';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { Category } from '../../../entities/category.entity';
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
import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryDto } from '../../../models/request-dto/create-category-dto';
import { ResponseMessages } from '../../../utils/response-messages';
import { FileUploadRequest } from '../../../models/request-dto/file-upload-request';

@Injectable()
export class CategoriesService {
	constructor(@InjectRepository(CategoriesRepository) private readonly _categoryRepo: CategoriesRepository) {}

	async getCategoryById(id: number): Promise<BaseResponse> {
		const category: Category = await this._categoryRepo.findOne(id);
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
		try {
			categories = await this._categoryRepo.find({
				order: { name: 'ASC' }
			});
		} catch (ex) {
			throw new InternalServerErrorException();
		}
		return {
 			body: categories,
			status: true,
			message: ResponseMessages.SUCCESS
		};
	}

	async getProductsByCategory(categoryId: number): Promise<BaseResponse>
    {
		const category = await this._categoryRepo.findOne(categoryId, {relations: ['products']});
		if(!category) throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
		const products = category.products.sort();
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: products
		}
	}
	
	async getProductByCategory(categoryId: number, productId: number): Promise<BaseResponse>{
		const category = await this._categoryRepo.findOne(categoryId, {relations: ['products']});
		if(!category) throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
		const product = category.products.find((value, index, obj) => value.id === productId);
		if(!product) throw new NotFoundException(ResponseMessages.PRODUCT_DOES_NOT_EXIST_IN_CATEGORY);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: product
		}
	}

	async createCategory(categoryReq: CreateCategoryDto, file: FileUploadRequest): Promise<BaseResponse> {
		// check if category exists
		const duplicateCount = await this._categoryRepo.findAndCount({
			where: { name: { value: categoryReq.name } }
		});

		if (duplicateCount[1] >= 1) {
			throw new BadRequestException(ResponseMessages.CATEGORY_EXISTS);
		}
		const category = new Category();
		category.name = categoryReq.name;
		category.imageName = file.filename || null;
		category.description = categoryReq.description;

		await this._categoryRepo.save(category);
		return {
			body: category,
			status: true,
			message: ResponseMessages.CREATE_CATEGORY_SUCCESS
		};
	}

	async updateCategory(request: Partial<UpdateCategoryDto>, id: number): Promise<BaseResponse> {
		const category = await this._categoryRepo.findOne(id);
		if (!category) {
			throw new NotFoundException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);
		}
		// if (!request.rowVersion || request.rowVersion !== category.rowVersion) {
		//   throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
		// }
		const result = await this._categoryRepo.update({ id }, request);
		if (!result) {
			throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
		}
		return {
			body: null,
			status: true,
			message: ResponseMessages.UPDATE_CATEGORY_SUCCESS
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
