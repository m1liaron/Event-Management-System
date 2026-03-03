import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { EventsService } from "../events/events.service";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,

		private readonly eventService: EventsService
	) {}

	async findByEmail(email: string) {
		return this.userRepo.findOne({
			where: { email },
		});
	}

	async findByEmailWithPassword(email: string) {
		return this.userRepo.findOne({
			where: { email: email.trim() },
			select: ["email", "password", "name"],
		});
	}

	async createUser(body: CreateUserDto) {
		return this.userRepo.save(body);
	}

	async getEvents(id: string) {
		return this.eventService.findByOrganizer(id);
	}
}
