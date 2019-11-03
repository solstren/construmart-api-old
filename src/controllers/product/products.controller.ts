import { Controller, UsePipes, UseFilters, UseInterceptors, Get, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { ProductsService } from './services/products.service';
import { BaseResponse } from '../../models/response-dto/base-response';
import { AppConstants } from '../../utils/app-constants';
import { ApiOkResponse, ApiNotFoundResponse, ApiUseTags, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('products')
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class ProductsController {
	constructor(private _productService: ProductsService) {}

	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
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
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@Get()
	async getAllProducts(): Promise<BaseResponse> {
		return await this._productService.getAllProducts();
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
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@Delete('/:id')
	async deleteProduct(
		@Param('id', ParseIntPipe)
		id: number
	): Promise<BaseResponse> {
		return await this._productService.deleteProduct(id);
	}
}
