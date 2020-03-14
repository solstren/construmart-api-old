import { LoginRequest } from './../../models/request-dto/login-request.dto';
import { BaseResponse } from './../../models/response-dto/base-response';
import { ApiUseTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { LoggerInterceptor } from './../../shared/logger.interceptor';
import { HttpErrorFilter } from './../../shared/http-error.filter';
import { AppValidationPipe } from './../../shared/app-validation.pipe';
import { AppConstants } from './../../utils/app-constants';
import { Controller, UsePipes, UseFilters, UseInterceptors, Post, Body } from '@nestjs/common';

@Controller(`${AppConstants.APP_BASE_URL}user/authenticate`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class UserController {
    constructor(private _userService: UserService) { }

    @ApiUseTags(AppConstants.SWAGGER_USER_TAG)
    @ApiUnauthorizedResponse({
        type: BaseResponse,
        description: AppConstants.SWAGGER_401_DESCRIPTION
    })
    @ApiUnprocessableEntityResponse({
        type: BaseResponse,
        description: AppConstants.SWAGGER_422_DESCRIPTION
    })
    @ApiInternalServerErrorResponse({
        description: AppConstants.SWAGGER_500_DESCRIPTION
    })
    @ApiOkResponse({
        description: AppConstants.SWAGGER_200_DESCRIPTION
    })
    @Post()
    async postProduct(@Body() request: LoginRequest): Promise<BaseResponse> {
        return await this._userService.authenticateUser(request);
    }
}