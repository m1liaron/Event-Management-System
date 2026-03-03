import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
@ApiBearerAuth()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	@ApiOperation({ summary: "Register a new user" })
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Post("login")
	@ApiOperation({ summary: "Login and get JWT" })
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto.email, dto.password);
	}
}
