import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
	) {}

	async findByEmail(email: string) {
		return this.userRepo.findOne({
			where: { email },
		});
	}

	async findByEmailWithPassword(email: string) {
		return this.userRepo
			.createQueryBuilder("user")
			.addSelect("user.password")
			.where("user.email = :email", { email })
			.getOne();
	}

	async create(body: CreateUserDto) {
		return this.userRepo.create(body);
	}
}
