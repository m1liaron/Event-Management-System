import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(Event)
		private readonly eventRepo: Repository<Event>,
	) {}

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

	async findByOrganizer(organizerId: string) {
		return this.eventRepo.find({
			where: { organizer: { id: organizerId }}
		})
	}
}
