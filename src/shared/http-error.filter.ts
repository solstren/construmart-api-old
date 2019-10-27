import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseResponse } from '../models/response-dto/base-response';
import { ResponseMessages } from '../utils/response-messages';

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
    Logger.error(`${request.method} ==> ${request.url}`, JSON.stringify(errorObj), HttpErrorFilter.name);
    const errorResponse: BaseResponse = {
      status: false,
      message: ResponseMessages.ERROR,
      body: errorObj
    };
    response.status(status).json(errorResponse);
  }
}
