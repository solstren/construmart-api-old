import {
	Controller,
	UsePipes,
	UseFilters,
	UseInterceptors,
	Get,
	Param,
	ParseIntPipe,
	Delete,
	Put,
	UploadedFile,
	Body,
	HttpStatus,
	Post,
	Logger
} from '@nestjs/common';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { ProductsService } from './services/products.service';
import { BaseResponse } from '../../models/response-dto/base-response';
import { AppConstants } from '../../utils/app-constants';
import {
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiUseTags,
	ApiInternalServerErrorResponse,
	ApiImplicitBody,
	ApiConsumes,
	ApiImplicitFile,
	ApiResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { ProductRequestDto } from '../../models/request-dto/product-request-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadRequest } from '../../models/request-dto/file-upload-request';

@Controller(`${AppConstants.APP_BASE_URL}products`)
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
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	// @ApiImplicitBody({ name: 'product-request-dto', type: ProductRequestDto, required: true })
	@ApiConsumes('multipart/form-data')
	@ApiImplicitFile({ name: 'imageFile', required: false, description: 'the image file for the product' })
	@Put('/:id')
	@UseInterceptors(FileInterceptor('imageFile'))
	async updateProduct(
		@Param('id', ParseIntPipe)
		id: number,
		@UploadedFile() file: FileUploadRequest,
		@Body() request: ProductRequestDto
	): Promise<BaseResponse> {
		return await this._productService.updateProduct(id, file, request);
	}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
	@ApiCreatedResponse({
		type: BaseResponse,
		description: AppConstants.SWAGGER_201_DESCRIPTION
	})
	@ApiBadRequestResponse({
		type: BaseResponse,
		description: AppConstants.SWAGGER_400_DESCRIPTION
	})
	@ApiUnprocessableEntityResponse({
		type: BaseResponse,
		description: AppConstants.SWAGGER_422_DESCRIPTION
	})
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@ApiConsumes('multipart/form-data')
	@ApiImplicitFile({ name: 'imageFile', required: false, description: 'the image file for the product' })
	@Post()
	@UseInterceptors(FileInterceptor('imageFile'))
	async postProduct(@UploadedFile() file: FileUploadRequest, @Body() request: ProductRequestDto): Promise<any> {
		return await this._productService.createProduct(request, file);
	}
}
