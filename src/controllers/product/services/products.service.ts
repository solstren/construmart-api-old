import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
	UnprocessableEntityException,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { BaseResponse } from '../../../models/response-dto/base-response';
import { ResponseMessages } from '../../../utils/response-messages';
import { ProductRequestDto } from '../../../models/request-dto/product-request-dto';
import { FileUploadRequest } from '../../../models/request-dto/file-upload-request';
import { UpdateResult } from 'typeorm';
import { CategoriesRepository } from '../../../controllers/category/repositories/categories.repository';
import { ObjectMapper } from '../../../utils/object-mapper';
import { Category } from '../../../entities/category.entity';
import { ProductResponse } from '../../../models/response-dto/product-response';
import { Inventory } from '../../../entities/inventory.entity';
import { InventoryRepository } from '../../../controllers/inventory/repository/inventory.repository';
import { SortOrder } from '../../../models/request-dto/sort-order-enum';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(InventoryRepository) private readonly _inventoryRepo: InventoryRepository,
		@InjectRepository(ProductsRepository) private readonly _productRepo: ProductsRepository,
		@InjectRepository(CategoriesRepository) private readonly _categoryRepo: CategoriesRepository
	) {}

	async getProductById(id: number): Promise<BaseResponse> {
		let product: Product;
		let productResponse: ProductResponse;
		try {
			product = await this._productRepo.findOne(id, { loadEagerRelations: true, relations: [ 'category' ] });
			if (!product) {
				throw new NotFoundException(`Product with id '${id}' not found`);
			}
			productResponse = ObjectMapper.mapToProductResponse(product);
		} catch (error) {
			throw new InternalServerErrorException(ResponseMessages.ERROR);
		}
		return {
			status: true,
			message: 'success',
			body: productResponse
		};
	}

	async getAllProducts(page: number = 1, itemCount: number = 10): Promise<BaseResponse> {
		let products: Product[] = [];
		let productResponses: ProductResponse[] = [];
		if (page <= 0 || itemCount <= 0) {
			products = await this._productRepo.find({
				order: { name: 'ASC' },
				loadEagerRelations: true,
				relations: [ 'category' ]
			});
		} else {
			products = await this._productRepo.find({
				order: { name: 'ASC' },
				loadEagerRelations: true,
				relations: [ 'category' ],
				take: itemCount,
				skip: itemCount * (page - 1)
			});
		}

		if (products.length > 0) {
			products.forEach((product) => {
				let productResponse = ObjectMapper.mapToProductResponse(product);
				productResponses.push(productResponse);
			});
		}
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: {
				products: productResponses,
				totalCount: productResponses.length
			}
		};
	}

	async deleteProduct(id: number): Promise<BaseResponse> {
		const product = await this._productRepo.findOne(id);
		if (!product) {
			throw new NotFoundException(`Product with id ${id} not found`);
		}
		await this._productRepo.remove(product);
		const inventory = await this._inventoryRepo.getInventoryByProductId(product.id);
		await this._inventoryRepo.remove(inventory);
		return {
			status: true,
			message: ResponseMessages.SUCCESS,
			body: null
		};
	}

	async createProduct(productReq: ProductRequestDto, file: FileUploadRequest): Promise<BaseResponse> {
		let product: Product;
		// check if category exists
		const duplicateCount = await this._productRepo.findAndCount({
			where: { name: { value: productReq.name } }
		});

		if (duplicateCount[1] >= 1) {
			throw new UnprocessableEntityException(ResponseMessages.CATEGORY_EXISTS);
		}
		var category = await this._categoryRepo.findOne(productReq.categoryId);
		if (!category) throw new UnprocessableEntityException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);

		product = new Product();
		product.name = productReq.name;
		product.imageName = file.filename || null;
		product.description = productReq.description;
		product.price = productReq.price;
		product.category = category;
		await this._productRepo.save(product);

		let inventory: Inventory = new Inventory();
		inventory.initialPrice = 0;
		inventory.initialQuatity = 0;
		inventory.currentPrice = 0;
		inventory.currentQuantity = 0;
		inventory.product = product;

		const inventoryResult = await this._inventoryRepo.insertInventory(inventory);
		// const result = ObjectMapper.mapToInventoryResponse(inventoryResult);
		if (product.id <= 0) {
			throw new UnprocessableEntityException('Failed to create product');
		}

		return {
			status: true,
			message: ResponseMessages.CREATE_PRODUCT_SUCCESS,
			body: product
		};
	}

	async updateProduct(
		id: number,
		file: FileUploadRequest,
		request: Partial<ProductRequestDto>
	): Promise<BaseResponse> {
		const product = await this._productRepo.findOne(id);
		if (!product) {
			throw new NotFoundException(ResponseMessages.PRODUCT_DOES_NOT_EXIST);
		}
		var category = await this._categoryRepo.findOne(request.categoryId);
		if (!category) throw new UnprocessableEntityException(ResponseMessages.CATEGORY_DOES_NOT_EXIST);

		product.name = request.name || product.name;
		product.description = request.description || product.description;
		product.price = request.price || product.price;
		product.imageName = file ? file.filename : product.imageName;
		product.category = category;

		const result: Product = await this._productRepo.save(product);
		if (!result) {
			throw new HttpException(ResponseMessages.ERROR, HttpStatus.NOT_MODIFIED);
		}
		return {
			status: true,
			message: ResponseMessages.UPDATE_PRODUCT_SUCCESS,
			body: null
		};
	}
}
