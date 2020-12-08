import {
	IsString,
	IsEmail,
	IsDefined,
	IsOptional,
	MinLength
} from "class-validator";

export class RegisterDto {
	@IsString()
	@IsEmail()
	@IsDefined()
	readonly email: string;

	@IsString()
	@IsDefined()
	readonly name: string;

	@IsString()
	@IsDefined()
	@MinLength(8)
	readonly password: string;

	@IsString()
	@IsOptional()
	readonly role: string;
}
