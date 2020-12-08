import { IsString, IsEmail, IsDefined } from "class-validator";

export class LoginDto {
	@IsString()
	@IsEmail()
	@IsDefined()
	readonly email: string;

	@IsString()
	@IsDefined()
	readonly password: string;
}
