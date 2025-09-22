import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { SharedStatus } from "@src/shared/utils/SharedEnum";

export class CreateBankAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    customerOids: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accountType: string;

    @ApiProperty()
    @IsNotEmpty()
    balance: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currency: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: SharedStatus;
}
