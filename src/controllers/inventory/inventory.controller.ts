import { Controller, UsePipes, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppConstants } from '../../utils/app-constants';
import { AppValidationPipe } from '../../shared/app-validation.pipe';
import { HttpErrorFilter } from '../../shared/http-error.filter';
import { LoggerInterceptor } from '../../shared/logger.interceptor';

@Controller(`${AppConstants.APP_BASE_URL}inventory`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class InventoryController {
    
}
