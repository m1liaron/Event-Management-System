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
import { Event } from "./modules/events/entities/event.entity";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			validationSchema: envValidationSchema,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: "postgres",
				host: config.getOrThrow<string>("DB_HOST"),
				port: config.getOrThrow<number>("DB_PORT"),
				password: config.getOrThrow<string>("DB_PASSWORD"),
				database: config.getOrThrow<string>("DB_NAME"),
				username: config.getOrThrow<string>("DB_USER"),
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		EventsModule,
		AuthModule,
		UsersModule,
		TypeOrmModule.forFeature([User, Event]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
