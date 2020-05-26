import { CompleteResetPasswordRequestDto } from './../../models/request-dto/complete-reset-password-request.dto';
import { InitiateResetPasswordRequestDto } from './../../models/request-dto/initiate-reset-password-request.dto';
import { ChangePasswordRequestDto } from './../../models/request-dto/change-password-request.dto';
import { UserType } from './../../entities/user.entity';
import { RolesGuard } from './../../shared/roles.auth.guard';
import { JwtAuthGuard } from './../../shared/jwt.auth.guard';
import { Roles } from './../../shared/roles.decorator';
import { ResendOtpRequestDto } from './../../models/request-dto/resend-otp-request.dto';
import { LoginRequest } from './../../models/request-dto/login-request.dto';
import { BaseResponse } from './../../models/response-dto/base-response';
import { ApiUseTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { LoggerInterceptor } from './../../shared/logger.interceptor';
import { HttpErrorFilter } from './../../shared/http-error.filter';
import { AppValidationPipe } from './../../shared/app-validation.pipe';
import { AppConstants } from './../../utils/app-constants';
import { Controller, UsePipes, UseFilters, UseInterceptors, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller(`${AppConstants.APP_BASE_URL}user`)
@UsePipes(AppValidationPipe)
@UseFilters(HttpErrorFilter)
@UseInterceptors(LoggerInterceptor)
export class UserController {
    constructor(private _userService: UserService) { }

    // @UseGuards(AuthGuard('local'))
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
    @Post('/authenticate')
    async login(@Body() request: LoginRequest): Promise<BaseResponse> {
        return await this._userService.authenticateUser(request);
    }

    @ApiUseTags(AppConstants.SWAGGER_USER_TAG)
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
    @Post('/resend-otp')
    async resendOtp(@Body() request: ResendOtpRequestDto): Promise<BaseResponse> {
        return await this._userService.resendOtp(request);
    }

    @ApiUseTags(AppConstants.SWAGGER_USER_TAG)
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
    @UseGuards(JwtAuthGuard)
    // @Roles(UserType.ADMIN)
    @Post('/change-password')
    async changePassword(@Body() dto: ChangePasswordRequestDto, @Request() request: any): Promise<BaseResponse> {
        return await this._userService.changePassword(request.user, dto);
    }

    @ApiUseTags(AppConstants.SWAGGER_USER_TAG)
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
    // @Roles(UserType.ADMIN)
    @Post('/reset-password/initiate')
    async initiateResetPassword(@Body() dto: InitiateResetPasswordRequestDto): Promise<BaseResponse> {
        return await this._userService.initiateResetPassword(dto);
    }

    @ApiUseTags(AppConstants.SWAGGER_USER_TAG)
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
    @Post('/reset-password/complete')
    async completeResetPassword(@Body() dto: CompleteResetPasswordRequestDto): Promise<BaseResponse> {
        return await this._userService.initiateResetPassword(dto);
    }
}