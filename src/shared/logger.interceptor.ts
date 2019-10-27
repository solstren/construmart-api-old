import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<Request>();
		const method = req.method;
		const url = req.url;
		const now = Date.now();

		return next
			.handle()
			.pipe(tap(() => Logger.log(`${method}, ${url}, ${Date.now() - now}ms`, context.getClass().name)));
	}
}
