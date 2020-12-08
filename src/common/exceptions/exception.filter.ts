import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		let message = exception.getResponse();
		if (typeof message != "string") message = message["message"][0];
		response.status(status).json({
			error: true,
			data: null,
			message
		});
	}
}
