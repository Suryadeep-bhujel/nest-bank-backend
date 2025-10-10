import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateBranchDto {
    @IsOptional()
    _oid?: string;
    @IsNotEmpty()
    @IsString()
    branchName: string;

    @IsNotEmpty()
    branchCode: string;

    @IsNotEmpty()
    @IsString()
    branchAddress: string;

    @IsNotEmpty()
    @IsMobilePhone()    
    branchPhoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    branchEmail: string;

    @IsOptional()
    @IsUrl()
    branchWebsite: string;

    @IsOptional()
    @IsString()
    branchDescription: string;

    @IsOptional()
    @IsString()
    branchType: string;

    @IsOptional()
    @IsString()
    branchStatus: string;

    @IsOptional()
    @IsString()
    managerOid?: string;
}
