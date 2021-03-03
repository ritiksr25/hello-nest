import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Controller("todos")
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Post()
	create(@Body() createTodoDto: CreateTodoDto) {
		return this.todoService.create(createTodoDto);
	}

	@Get()
	findAll() {
		return this.todoService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.todoService.findOne(id);
	}

	@Put(":id")
	update(@Param("id") id: string) {
		return this.todoService.update(id);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.todoService.remove(id);
	}
}
