import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("users")
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get("me")
	getProfile(@CurrentUser() req) {
		return req.user
	}

	@UseGuards(JwtAuthGuard)
	@Get("/me/events")
	getEvents(@Body() req) {
		return this.usersService.getEvents(req.id)
	}
}
