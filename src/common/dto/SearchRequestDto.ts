import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchField {
    fieldName?: string;
    fieldValue?: string;
}
export class SearchRequestDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fieldName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fieldValue?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 10;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sortBy?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sortOrder?: 'ASC' | 'DESC';
}