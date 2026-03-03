import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { Event } from "./entities/event.entity";
import { User } from "../users/entities/user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Event, User])],
	controllers: [EventsController],
	providers: [EventsService],
	exports: [EventsService]
})
export class EventsModule {}
