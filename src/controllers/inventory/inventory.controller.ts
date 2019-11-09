import { Controller, UsePipes, UseFilters, UseInterceptors, ParseIntPipe, Get, Param } from '@nestjs/common';
import { AppConstants } from '../../utils/app-constants';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { InventoryService } from './services/inventory.service';
import { BaseResponse } from '../../models/response-dto/base-response';
import { ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller(`${AppConstants.APP_BASE_URL}inventory`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class InventoryController {
    constructor(private _inventoryService: InventoryService) {}
    
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
		return await this._inventoryService.getInventoryByProductId(productId)
	}
}
