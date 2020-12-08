import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exceptions/exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true
		})
	);
	await app.listen(process.env.PORT || 5000);
}
bootstrap();
