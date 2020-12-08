import {
	Body,
	Controller,
	HttpCode,
	Post,
	HttpException
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dto/index";
import { ResponseHelpers } from "../../common/helpers/response.helpers";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	private responseHelpers = new ResponseHelpers();

	@Post("/register")
	@HttpCode(201)
	async register(@Body() registerDto: RegisterDto): Promise<any> {
		try {
			const data = await this.authService.register(registerDto);
			return this.responseHelpers.sendSuccess(data);
		} catch (err) {
			return Promise.reject(new HttpException(err.response, err.status));
		}
	}

	@Post("/login")
	async login(@Body() loginDto: LoginDto) {
		try {
			const data = await this.authService.login(loginDto);
			return this.responseHelpers.sendSuccess(data);
		} catch (err) {
			return Promise.reject(new HttpException(err.response, err.status));
		}
	}
}
