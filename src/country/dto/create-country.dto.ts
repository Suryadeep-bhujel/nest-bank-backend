import { CountryStatus, SanctionStatus } from "@bank-app-common/enum/SharedEnum";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";
import { SingleResponseDto } from "src/common/dto/SingleResponseDto";

export class CreateCountryDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(32, 32)
    _oid?: string;

    @ApiProperty({ example: 'India' })
    @IsString()
    countryName: string;

    @ApiProperty({ example: 'IN' })
    @IsString()
    countryCode: string;

    @ApiProperty({ example: '+91' })
    @IsOptional()
    @IsString()
    dialCode: string; // e.g. +91 for India

    @ApiProperty({ example: CountryStatus.ACTIVE })
    @IsOptional()
    @IsString()
    status?: CountryStatus;

    @ApiProperty({ example: SanctionStatus.CLEARED })
    @IsOptional()
    @IsString()
    sanctionStatus?: SanctionStatus
}
export class CountryResponseDto {
    declare countryName: string;
    declare countryCode: string;
    declare dialCode: string;
    declare status?: CountryStatus;
    declare sanctionStatus?: SanctionStatus;
    declare _oid?: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export class CreateUpdateResponseDto extends SingleResponseDto {
    declare data: CountryResponseDto | null; // Single data item
    declare success: boolean;
}