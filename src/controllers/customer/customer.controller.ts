import { LoggerInterceptor } from './../../shared/logger.interceptor';
import { HttpErrorFilter } from './../../shared/http-error.filter';
import { AppValidationPipe } from './../../shared/app-validation.pipe';
import { VerifyCustomerRequest } from './../../models/request-dto/verify-customer-dto';
import { CustomerService } from './services/customer.service';
import { CreateCustomerRequest } from './../../models/request-dto/create-customer-request-dto';
import { AppConstants } from './../../utils/app-constants';
import { BaseResponse } from './../../models/response-dto/base-response';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiUnprocessableEntityResponse, ApiInternalServerErrorResponse, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { Controller, Post, Body, UsePipes, UseFilters, UseInterceptors } from '@nestjs/common';

@Controller(`${AppConstants.APP_BASE_URL}customer`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class CustomerController {
    constructor(
        private _customerService: CustomerService
    ) { }

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
    async createCustomer(@Body() request: CreateCustomerRequest): Promise<BaseResponse> {
        return await this._customerService.createCustomer(request);
    }

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
    async verifyCustomer(@Body() request: VerifyCustomerRequest): Promise<BaseResponse> {
        return await this._customerService.verifyCustomer(request);
    }
}