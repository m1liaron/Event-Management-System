import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEventDto {
    @ApiProperty({ example: "Event 1" })
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ example: "Description" })
    description!: string;

    @ApiProperty({ example: "Tue Mar 03 2026 12:26:02 GMT+0200" })
    date!: Date;
    
    @ApiProperty({ example: "USA - New York" })
    location!: string;

    @ApiProperty({ example: 100 })
    capacity!: number;

    @ApiProperty({ example: "public" })
    visibility!: "public" | "private";
}
