import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { envValidationSchema } from "./config/env.validation";
import { AuthModule } from "./modules/auth/auth.module";
import { EventsModule } from "./modules/events/events.module";
import { User } from "./modules/users/entities/user.entity";
import { UsersModule } from "./modules/users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: envValidationSchema,
		}),
		EventsModule,
		AuthModule,
		UsersModule,
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: "postgres",
				host: config.getOrThrow<string>("DB_HOST"),
				port: config.getOrThrow<number>("DB_PORT"),
				password: config.getOrThrow<string>("DB_PASSWORD"),
				database: config.getOrThrow<string>("DB_NAME"),
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
