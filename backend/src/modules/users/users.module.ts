import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { EventsModule } from "../events/events.module";

@Module({
	imports: [TypeOrmModule.forFeature([User]), EventsModule],
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	exports: [UsersService],
})
export class UsersModule {}
