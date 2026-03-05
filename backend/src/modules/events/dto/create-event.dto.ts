import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";
import { IsFutureDate } from "../validators/is-future-date.validator";

export class CreateEventDto {
    @ApiProperty({ example: "Event 1" })
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ example: "Description" })
    description!: string;

    @ApiProperty({ example: "Tue Mar 03 2026 12:26:02 GMT+0200" })
    @IsDateString()
    @IsFutureDate()
    date!: Date;
    
    @ApiProperty({ example: "USA - New York" })
    location!: string;

    @ApiProperty({ example: 100 })
    capacity!: number;

    @ApiProperty({ example: "public" })
    visibility!: "public" | "private";
}
