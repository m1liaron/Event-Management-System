import { Body, Controller, Get } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly _usersService: UsersService) {}

	@Get("/me/events")
	create(@Body() _createUserDto: CreateUserDto) {}
}
