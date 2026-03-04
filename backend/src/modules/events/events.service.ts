import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class EventsService {
	constructor(
		@InjectRepository(Event)
		private readonly eventRepo: Repository<Event>,
	) {}

	async create(createEventDto: CreateEventDto, userId: string) {
		const eventData = {
			...createEventDto,
			organizer: { id: userId }
		}
		return await this.eventRepo.save(eventData);
	}

	async findAll(userId?: string) {
		const events = await this.eventRepo.find({
			relations: ["participants", "organizer"]
		});

		return events.map((event) => {
			const isJoined = userId
				? event.participants.some((user) => user.id === userId)
				: false;

			const participantsCount = event.participants.length;

			const { participants, ...eventData } = event;

			return {
				...eventData,
				participantsCount,
				isJoined,
			};
		})
	}

	async findOne(id: string, userId?: string) {
		const event = await this.eventRepo.findOne({ 
			where: { id },
			relations: ['participants', 'organizer']
		});

		if(event) {
			const isJoined = userId
				? event.participants.some((user) => user.id === userId)
				: false;

			const participantsCount = event.participants.length;
			return {
				...event,
				isJoined,
				participantsCount
			};
		}
	}

	async update(id: string, userId: string, updateEventDto: UpdateEventDto) {
		const event = await this.eventRepo.findOne({
			where: { id },
			relations: ['organizer']
		});
		if (!event) {
			throw new NotFoundException("Event not found");
		}

		if(event?.organizer.id !== userId ) {
			throw new ForbiddenException("Only organizer can update");
		}

		Object.assign(event, updateEventDto);

		const updatedEvent = await this.eventRepo.save(event);

		return updatedEvent;
	}

	async remove(id: string) {
		return await this.eventRepo.delete(id);
	}

	async join(eventId: string, userId: string) {
		const event = await this.eventRepo.findOne({
			where: { id: eventId },
			relations: ['participants']
		});

		if (!event) throw new NotFoundException("Event not found");

		const isAlreadyJoined = event.participants.some(user => user.id === userId);

		if (!isAlreadyJoined) {
			event.participants.push({ id: userId } as User);
			await this.eventRepo.save(event);
		}

		return this.findOne(eventId, userId);
	}

	async leave(eventId: string, userId: string) {
		const event = await this.eventRepo.findOne({
			where: { id: eventId },
			relations: ['participants']
		});

		if (!event) throw new NotFoundException("Event not found");

		event.participants = event.participants.filter(user => user.id !== userId);

		await this.eventRepo.save(event);
		
		return this.findOne(eventId, userId);
	}

	async findByOrganizer(organizerId: string) {
		return await this.eventRepo.find({
			where: { organizer: { id: organizerId }}
		})
	}
}
