import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class GetUserDto {
    @ApiProperty({ example: "John Doe" })
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: "user@example.com" })
    @IsEmail()
    email!: string;
}
