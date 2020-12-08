import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Item, CreateItemInterface } from "../interfaces/index";

@Injectable()
export class ItemsService {
	constructor(@InjectModel("Item") private readonly itemModel: Model<Item>) {}

	async findAll(): Promise<Item[]> {
		return await this.itemModel.find();
	}

	async findOne(id: string): Promise<Item> {
		return await this.itemModel.findOne({ _id: id });
	}

	async create(item: CreateItemInterface): Promise<CreateItemInterface> {
		const newItem = new this.itemModel(item);
		return await newItem.save();
	}

	async update(
		id: string,
		item: CreateItemInterface
	): Promise<CreateItemInterface> {
		return await this.itemModel.findByIdAndUpdate({ _id: id }, item, {
			new: true
		});
	}

	async delete(id: string): Promise<Item> {
		return await this.itemModel.findByIdAndDelete(id);
	}
}
