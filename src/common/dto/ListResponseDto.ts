import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";


export class ListResponseDto {
    @ApiProperty()
    @IsArray()
    data: any[]; // Array of data items

    @ApiProperty()
    @IsNumber()
    total: number; // Total number of items

    @ApiProperty()
    @IsNumber()
    page: number; // Current page number

    @ApiProperty()
    @IsNumber()
    limit: number; // Number of items per page

    @ApiProperty()
    @IsNumber()
    currentPage: number; // Current page number

    @ApiProperty()
    @IsNumber()
    totalPages: number; // Total number of pages


    constructor(data: any[], total: number, limit: number, currentPage: number) {
        this.data = data;
        this.total = total;
        this.limit = limit;
        this.currentPage = currentPage;
        this.totalPages = Math.ceil(total / this.limit);
    }
}
export class CommonListReponse {
    @ApiProperty()
    @IsString()
    declare message?: string;

    @ApiProperty()
    @IsArray()
    declare data?: ListResponseDto
}