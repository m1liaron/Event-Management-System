import { Injectable } from "@nestjs/common";
import type { CreateEventDto } from "./dto/create-event.dto";
import type { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventsService {
	create(_createEventDto: CreateEventDto) {
		return "This action adds a new event";
	}

	findAll() {
		return `This action returns all events`;
	}

	findOne(id: number) {
		return `This action returns a #${id} event`;
	}

	update(id: number, _updateEventDto: UpdateEventDto) {
		return `This action updates a #${id} event`;
	}

	remove(id: number) {
		return `This action removes a #${id} event`;
	}
}
