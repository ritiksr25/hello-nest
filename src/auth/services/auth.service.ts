import { Injectable, HttpException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import {
	RegisterInterface,
	LoginInterface,
	UserInterface
} from "../interfaces/index";
import { httpStatus } from "./../../common/enums/status.enum";
const { BAD_REQUEST, SERVER_ERROR } = httpStatus;

@Injectable()
export class AuthService {
	constructor(
		@InjectModel("User") private readonly userModel: Model<UserInterface>
	) {}

	private async sanitiseUser(user) {
		return _.pick(user, [
			"name",
			"email",
			"role",
			"_id",
			"createdAt",
			"updatedAt"
		]);
	}

	async login({ email, password }: LoginInterface): Promise<any> {
		try {
			const user = await this.userModel.findOne({ email }).lean();
			if (!user)
				return Promise.reject(
					new HttpException("User not found.", BAD_REQUEST)
				);
			if (password !== user.password)
				return Promise.reject(
					new HttpException("Invalid password.", BAD_REQUEST)
				);
			return Promise.resolve(this.sanitiseUser(user));
		} catch (error) {
			console.log(error);
			return Promise.reject(
				new HttpException("Something went wrong.", SERVER_ERROR)
			);
		}
	}

	async register(registerInterface: RegisterInterface): Promise<any> {
		try {
			let user = await this.userModel.findOne({
				email: registerInterface.email
			});
			if (user)
				return Promise.reject(
					new HttpException("Email already registered.", BAD_REQUEST)
				);

			user = await this.userModel.create(registerInterface);
			return Promise.resolve(this.sanitiseUser(user));
		} catch (error) {
			console.log(error);
			return Promise.reject(
				new HttpException("Something went wrong.", SERVER_ERROR)
			);
		}
	}
}
