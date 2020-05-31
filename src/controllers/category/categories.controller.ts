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
	UseInterceptors,
	Delete,
	UploadedFile,
	Res,
	Logger,
	Query
} from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import {
	ApiUseTags,
	ApiResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiUnprocessableEntityResponse,
	ApiImplicitFile,
	ApiConsumes,
	ApiImplicitBody
} from '@nestjs/swagger';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import {} from 'path';
import { FileUploadRequest } from '../../models/request-dto/file-upload-request';
import { BaseResponse } from '../../models/response-dto/base-response';
import { CategoryRequestDto } from '../../models/request-dto/category-request.dto';

//categories
@Controller(`${AppConstants.APP_BASE_URL}categories`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class CategoriesController {
	constructor(private _categoryService: CategoriesService) {}

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
	async getCategoryById(
		@Param('id', ParseIntPipe)
		id: number
	): Promise<BaseResponse> {
		return await this._categoryService.getCategoryById(id);
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
	async getAllCategories(
		@Query('offset', ParseIntPipe)
		offset: number,
		@Query('limit', ParseIntPipe)
		limit: number
	): Promise<BaseResponse> {
		return await this._categoryService.getAllCategories(offset, limit);
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
	@ApiImplicitFile({ name: 'imageFile', required: false, description: 'the image file for the category' })
	@Post()
	@UseInterceptors(FileInterceptor('imageFile'))
	async postCategory(@UploadedFile() file: FileUploadRequest, @Body() request: CategoryRequestDto): Promise<any> {
		return await this._categoryService.createCategory(request, file);
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
	@ApiConsumes('multipart/form-data')
	@ApiImplicitFile({ name: 'imageFile', required: false, description: 'the image file for the category' })
	@Put('/:id')
	@UseInterceptors(FileInterceptor('imageFile'))
	async updateCategory(
		@Param('id', ParseIntPipe)
		id: number,
		@UploadedFile() file: FileUploadRequest,
		@Body() request: CategoryRequestDto
	): Promise<BaseResponse> {
		return await this._categoryService.updateCategory(id, file, request);
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
	async deleteCategory(
		@Param('id', ParseIntPipe)
		id: number
	): Promise<BaseResponse> {
		return await this._categoryService.deleteCategory(id);
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
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	async getCategoryProducts(
		@Param('categoryId', ParseIntPipe)
		categoryId: number
	) {
		return this._categoryService.getProductsByCategory(categoryId);
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
	@Get('/:categoryId/products/:productId')
	async getCategoryProduct(
		@Param('categoryId', ParseIntPipe)
		categoryId: number,
		@Param('productId', ParseIntPipe)
		productId: number
	) {
		return this._categoryService.getProductByCategory(categoryId, productId);
	}
}