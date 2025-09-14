import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsOptional()
    addedByStaffId?: bigint;

    @IsOptional()
    _oid: string;
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    middleName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phoneNumber: string;

    @IsNotEmpty()
    // @DateFor()
    dateOfBirth: Date;
}
export class CreateCustomerResponseDto {
    data: {
        id: bigint;
        _oid: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        dateOfBirth: Date;
    }
    message: string;
    statusCode?: number;
}