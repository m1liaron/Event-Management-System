import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsService } from "./events.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { OptionalJwtAuthGuard } from "../auth/guards/optional-jwt-auth.guard";

@Controller("events")
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createEventDto: CreateEventDto) {
		return this.eventsService.create(createEventDto);
	}

	@UseGuards(OptionalJwtAuthGuard)
	@Get()
	findAll(@Request() req) {
		return this.eventsService.findAll(req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.eventsService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
		return this.eventsService.update(id, updateEventDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.eventsService.remove(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post(":id/join")
	join(@Param("id") eventId: string, @Request() req) {
		const userId = req.user.id;
		return this.eventsService.join(eventId, userId);
	}

	@UseGuards(JwtAuthGuard)
	@Post(":id/leave")
	leave(@Param("id") eventId: string, @Request() req) {
		const userId = req.user.id;
		return this.eventsService.leave(eventId, userId);
	}
}
