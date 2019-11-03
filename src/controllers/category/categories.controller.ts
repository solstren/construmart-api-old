import { CategoryRequestDto } from '../../models/request-dto/category-request-dto';
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
	UseInterceptors,
	Delete,
	UploadedFile,
	Res
} from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
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
import { FileInterceptor } from '@nestjs/platform-express';
import {} from 'path';
import { FileUploadRequest } from '../../models/request-dto/file-upload-request';

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
	@Get()
	async getAllCategories(): Promise<BaseResponse> {
		return await this._categoryService.getAllCategories();
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
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@Post()
	@UseInterceptors(FileInterceptor('categoryImage'))
	async postCategory(@UploadedFile() file: FileUploadRequest, @Body() request: CategoryRequestDto): Promise<any> {
		console.log(file);
		console.log(request);
		// return await this._categoryService.createCategory(request, file);
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
	@UseInterceptors(FileInterceptor('categoryImage'))
	async updateCategory(
		@Param('id', ParseIntPipe)
		id: number,
		@Body() request: CategoryRequestDto
	): Promise<BaseResponse> {
		return await this._categoryService.updateCategory(request, id);
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
	@Get('/:categoryId/products/:productId')
	async getCategoryProduct(
		@Param('categoryId', ParseIntPipe)
		categoryId: number,
		@Param('productId', ParseIntPipe)
		productId: number
	) {
		return this._categoryService.getProductByCategory(categoryId, productId);
	}

	@Get('/:filepath')
	async serveCategoryImage(@Param('filename') filename, @Res() res): Promise<any> {
		res.sendFile(filename, { root: 'uploads' });
	}
}
