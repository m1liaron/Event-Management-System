import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";

@Controller("users")
export class UsersController {
	constructor(private readonly _usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get("me")
	getProfile(@CurrentUser() req) {
		return req.user
	}

	@Get("/me/events")
	create(@Body() _createUserDto: CreateUserDto) {}
}
