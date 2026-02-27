import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
	@ApiProperty({ example: "user@example.com " })
	@IsEmail()
	email!: string;

	@ApiProperty({ example: "Password123!" })
	@MinLength(8, { message: "Password must be at least 8 characters long" })
	password!: string;

	@ApiProperty({ example: "John Doe" })
	@IsNotEmpty()
	name!: string;
}
