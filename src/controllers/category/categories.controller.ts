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
  ValidationPipe
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
import { CreateCategoryDto } from '../../models/request-dto/create-category-dto';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';

@Controller(`${AppConstants.APP_BASE_URL}categories`)
export class CategoriesController {
	constructor(private _categoryService: CategoriesService) {}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG, AppConstants.SWAGGER_CUSTOMER_TAG)
	@Get('/:id')
	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiNotFoundResponse({
		description: AppConstants.SWAGGER_404_DESCRIPTION,
		type: BaseResponse
	})
	@UseFilters(HttpErrorFilter)
	async getCategoryById(
		@Param('id', ParseIntPipe)
		id: number
	): Promise<BaseResponse> {
		return await this._categoryService.getCategoryById(id);
	}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG, AppConstants.SWAGGER_CUSTOMER_TAG)
	@Get()
	async getAllCategories(): Promise<BaseResponse> {
		return await this._categoryService.getAllCategories();
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
  @UsePipes(AppValidationPipe)
  @UseFilters(HttpErrorFilter)
	async postCategory(@Body() request: CreateCategoryDto): Promise<BaseResponse> {
		return await this._categoryService.createCategory(request);
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
	@UseFilters(HttpErrorFilter)
	@UsePipes(AppValidationPipe)
	async updateCategory(
		@Param('id', ParseIntPipe)
		id: number,
		@Body() request: UpdateCategoryDto
	) {
		return await this._categoryService.updateCategory(request, id);
	}
}
