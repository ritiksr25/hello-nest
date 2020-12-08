import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ItemsModule } from "./items/items.module";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
@Module({
	imports: [
		ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
		MongooseModule.forRoot(process.env.MONGO_URI),
		ItemsModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
