import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsService } from "./events.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("events")
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createEventDto: CreateEventDto) {
		return this.eventsService.create(createEventDto);
	}

	@Get()
	findAll() {
		return this.eventsService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.eventsService.findOne(+id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
		return this.eventsService.update(+id, updateEventDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.eventsService.remove(+id);
	}

	@UseGuards(JwtAuthGuard)
	@Post(":id/join")
	join(@Body() createEventDto: CreateEventDto) {
		return this.eventsService.create(createEventDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post(":id/leave")
	leave(@Body() createEventDto: CreateEventDto) {
		return this.eventsService.create(createEventDto);
	}
}
