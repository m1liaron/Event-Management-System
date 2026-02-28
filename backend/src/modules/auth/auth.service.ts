import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import type { UsersService } from "../users/users.service";
import type { User } from "../users/entities/user.entity";
import type { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.usersService.findByEmail(dto.email);
		if (existingUser) throw new ConflictException("Email already exists");

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		const user = await this.usersService.create({
			...dto,
			password: hashedPassword,
		});

		return this.generateToken(user);
	}

	async login(email: string, pass: string) {
		const user = await this.usersService.findByEmailWithPassword(email);

		if (!user || !(await bcrypt.compare(pass, user.password))) {
			throw new UnauthorizedException("Invalid credentials");
		}

		return this.generateToken(user);
	}

	private generateToken(user: User) {
		const payload = { sub: user.id, email: user.email };
		return {
			access_tone: this.jwtService.sign(payload),
			user: { id: user.id, name: user.name, email: user.name },
		};
	}
}
