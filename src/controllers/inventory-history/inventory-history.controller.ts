import { Controller, UsePipes, UseFilters, UseInterceptors, Get, Query, ParseIntPipe } from '@nestjs/common';
import { InventoryHistoryService } from './services/inventory-history.service';
import { AppConstants } from '../../utils/app-constants';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';
import { ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiUseTags } from '@nestjs/swagger';
import { BaseResponse } from '../../models/response-dto/base-response';

@Controller(`${AppConstants.APP_BASE_URL}inventory-history`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class InventoryHistoryController {
    
    constructor(private _inventoryHistoryService: InventoryHistoryService) {}
    
    @ApiUseTags(AppConstants.SWAGGER_ADMIN_TAG)
    @ApiOkResponse({
		description: AppConstants.SWAGGER_200_DESCRIPTION,
		type: BaseResponse
    })
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@ApiInternalServerErrorResponse({
		description: AppConstants.SWAGGER_500_DESCRIPTION
	})
	@Get()
	async getAllInventoryHistory(
		@Query('offset', ParseIntPipe)
		offset: number,
		@Query('limit', ParseIntPipe)
		limit: number
	): Promise<BaseResponse> {
		return await this._inventoryHistoryService.getInventoryHistories(offset, limit);
	}
}
