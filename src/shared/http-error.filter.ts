import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseResponse } from '../models/response-dto/base-response';
import { ResponseMessages } from '../utils/response-messages';
import { stringLiteral } from '@babel/types';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const errorObj = {
            httpStatus: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            error: exception.message.error,
            message: exception.message.message || null
        };

        let errorMsg: string;

        switch (status) {
            case HttpStatus.BAD_REQUEST:
                errorMsg = 'Invalid Request. Kindly send a valid request';
                break;
            case HttpStatus.NOT_MODIFIED:
                errorMsg = 'Failed to update data. Please try again';
                break;
            case HttpStatus.UNAUTHORIZED:
                errorMsg = 'Invalid user credentials. Please provide valid credentials';
                break;
            default:
                errorMsg = ResponseMessages.ERROR;
                break;
        }

        Logger.error(`${request.method} ==> ${request.url}`, JSON.stringify(errorObj), HttpErrorFilter.name);
        const errorResponse: BaseResponse = {
            status: false,
            message: errorMsg,
            body: errorObj
        };
        response.status(status).json(errorResponse);
    }
}
