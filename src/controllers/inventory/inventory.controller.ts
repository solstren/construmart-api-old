import {
	Controller,
	UsePipes,
	UseFilters,
	UseInterceptors,
	ParseIntPipe,
	Get,
	Param,
	Body,
	Query,
	Put,
	HttpStatus
} from '@nestjs/common';
import { AppConstants } from '../../utils/app-constants';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { InventoryService } from './services/inventory.service';
import { BaseResponse } from '../../models/response-dto/base-response';
import {
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiInternalServerErrorResponse,
	ApiUseTags,
	ApiResponse
} from '@nestjs/swagger';
import { InventoryRequestDto } from '../../models/request-dto/inventory-request-dto';

@Controller(`${AppConstants.APP_BASE_URL}inventories`)
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
	async getInventoryByProductId(
		@Param('productId', ParseIntPipe)
		productId: number
	): Promise<BaseResponse> {
		return await this._inventoryService.getInventoryByProductId(productId);
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
	@Put('/:id')
	async updateInventory(
		@Param('productId', ParseIntPipe)
		productId: number,
		@Body() request: InventoryRequestDto
	): Promise<BaseResponse> {
		return await this._inventoryService.updateInventory(request, productId);
	}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@Get('/paginated')
	async getInventoriesPaginted(
		@Query('offset', ParseIntPipe)
		offset: number,
		@Query('limit', ParseIntPipe)
		limit: number
	): Promise<BaseResponse> {
		try {
			return await this._inventoryService.getAllInventoriesPaginated(offset, limit);
		} catch (error) {
			console.log(`error ==> ${error}`);
		}
	}

	@ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
	@ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
	})
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@Get()
	async getInventories(): Promise<BaseResponse> {
		return await this._inventoryService.getAllInventories();
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
	@Get('/history')
	async getAllInventoryHistory(
		@Query('offset', ParseIntPipe)
		offset: number,
		@Query('limit', ParseIntPipe)
		limit: number
	): Promise<BaseResponse> {
		return await this._inventoryService.getInventoryHistories(offset, limit);
	}
}
