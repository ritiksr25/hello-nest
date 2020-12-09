import { Injectable, HttpException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
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

	private async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(14);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}

	private async isPasswordValid(
		password: string,
		originalPassword: string
	): Promise<boolean> {
		const comparePwd = await bcrypt.compare(password, originalPassword);
		return comparePwd;
	}

	async login({ email, password }: LoginInterface): Promise<any> {
		try {
			const user = await this.userModel.findOne({ email }).lean();
			if (!user)
				return Promise.reject(
					new HttpException("User not found.", BAD_REQUEST)
				);
			const isValidPassword = await this.isPasswordValid(
				password,
				user.password
			);
			if (!isValidPassword)
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
			registerInterface.password = await this.hashPassword(
				registerInterface.password
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
