import { Document } from "mongoose";

export interface TodoInterface extends Document {
	title: string;
	completed: boolean;
}
