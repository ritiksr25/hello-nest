import {
	BadRequestException,
	Injectable,
	NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Errors } from "src/common/enums";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoInterface } from "./interfaces";

@Injectable()
export class TodoService {
	constructor(
		@InjectModel("Todo") private readonly todoModel: Model<TodoInterface>
	) {}

	async create({ title }: CreateTodoDto) {
		const todo = new this.todoModel({ title });
		const _todo = await todo.save();
		return _todo;
	}

	async findAll() {
		const todos = await this.todoModel
			.find()
			.sort({ createdAt: "asc" })
			.lean();
		return todos;
	}

	async findOne(id: string) {
		const todo = await this.todoModel.findById(id).lean();
		return todo;
	}

	async update(id: string) {
		const todo = await this.todoModel.findById(id).lean();
		if (!todo) throw new BadRequestException(Errors.not_found);
		await this.todoModel.updateOne(
			{ _id: id },
			{ $set: { completed: !todo.completed } }
		);
		return null;
	}

	async remove(id: string) {
		const todo = await this.todoModel.findByIdAndDelete(id).lean();
		if (!todo) throw new NotFoundException(Errors.not_found);
		return null;
	}
}
