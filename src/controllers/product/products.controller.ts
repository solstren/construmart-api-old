import { UpdateCategoryDto } from './../../models/request-dto/update-category-dto';
import { BaseResponse } from './../../models/response-dto/base-response';
import { AppConstants } from '../../utils/app-constants';
import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Body,
	HttpStatus,
	Put,
	UsePipes,
	UseFilters,
	ValidationPipe,
	UseInterceptors,
	Delete,
	NotImplementedException
} from '@nestjs/common';
import {
	ApiUseTags,
	ApiResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiNotFoundResponse
} from '@nestjs/swagger';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { ProductsService } from './services/products.service';
import { CreateProductDto } from '../../models/request-dto/create-product-dto';

@Controller(`${AppConstants.APP_BASE_URL}product`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class ProductController {
	constructor(private _productService: ProductsService) {}

	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@Get('/:id')
	async getProductById(
		@Param('id', ParseIntPipe)
		id: number
	): Promise<BaseResponse> {
		return await this._productService.getProductById(id);
	}

	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@Get()
	async getAllProducts(): Promise<BaseResponse> {
		return await this._productService.getAllProducts();
	}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
	@ApiCreatedResponse({
		type: BaseResponse,
		description: AppConstants.SWAGGER_200_DESCRIPTION
	})
	@ApiBadRequestResponse({
		type: BaseResponse,
		description: AppConstants.SWAGGER_400_DESCRIPTION
	})
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@Post()
	async createProduct(@Body() request: CreateProductDto): Promise<BaseResponse> {
		return await this._productService.createProduct(request);
	}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
	@ApiResponse({
		status: HttpStatus.NOT_MODIFIED,
		type: BaseResponse,
		description: AppConstants.SWAGGER_304_DESCRIPTION
	})
	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@Put('/:id')
	async updateProduct(
		@Param('id', ParseIntPipe)
		id: number,
		@Body() request: UpdateCategoryDto
	): Promise<BaseResponse> {
		return await this._productService.updateProduct(request, id);
	}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@Delete('/:id')
	async deleteProduct(
		@Param('id', ParseIntPipe)
		id: number
	): Promise<BaseResponse> {
		return await this._productService.deleteProduct(id);
	}

	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@Get('/:categoryId/products')
	async getCategoryProducts(
		@Param('categoryId', ParseIntPipe)
		categoryId: number
	) {
		throw new NotImplementedException('this endpoint has not been implemented');
	}

	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@Get('/:categoryId/products/:productId')
	async getCategoryProduct(
		@Param('categoryId', ParseIntPipe)
		categoryId: number,
		@Param('productId', ParseIntPipe)
		productId: number
	) {
		throw new NotImplementedException('this endpoint has not been implemented');
	}
}
