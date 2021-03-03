import { IsString } from "class-validator";
import { getMissingFieldError } from "src/utils/utils.helper";

export class CreateTodoDto {
	@IsString({ message: getMissingFieldError("title") })
	readonly title: string;
}
