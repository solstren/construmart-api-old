import { Controller, UsePipes, UseFilters, UseInterceptors, ParseIntPipe, Get, Param, Post, UploadedFile, Body } from '@nestjs/common';
import { AppConstants } from '../../utils/app-constants';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { InventoryService } from './services/inventory.service';
import { BaseResponse } from '../../models/response-dto/base-response';
import { ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiUnprocessableEntityResponse, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { InventoryRequestDto } from '../../models/request-dto/inventory-request-dto';

@Controller(`${AppConstants.APP_BASE_URL}inventory`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class InventoryController {
    constructor(private _inventoryService: InventoryService) {}
    
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
    @Get('/:productId')
	async getCategoryById(
		@Param('productId', ParseIntPipe)
		productId: number
	): Promise<BaseResponse> {
		return await this._inventoryService.getInventoryByProductId(productId);
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
	@Post()
	async postCategory(@Body() request: InventoryRequestDto): Promise<BaseResponse> {
		return await this._inventoryService.addProductToInvetory(request);
	}
}
