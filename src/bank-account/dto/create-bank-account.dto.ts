import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { AccountType, AddressType, BankAccountStatusType, ChooseOptions, DocumentType, EducationalQualification, GenderType, MaritalStatus, Occupation, PersonCaste, PersonTitle } from "@bank-app-common/enum/SharedEnum";

export class CreateBankAccountDto {
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsArray()
    // customerOids: string[];

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
    status: BankAccountStatusType;
}
export class AccountInfoRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    branchCode: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accountType: AccountType

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: BankAccountStatusType
}
export class PersonalInfoRequestDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: PersonTitle;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    middleName?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    guardianName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender: GenderType
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    dateOfBirth: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    maritalStatus: MaritalStatus

    @ApiProperty()
    @IsOptional()
    @IsString()
    category: PersonCaste

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    occupation: Occupation

    @ApiProperty()
    @IsOptional()
    @IsString()
    education: EducationalQualification

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nationality: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    countryOfBirth: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    countryOfResidence: string
}

export class AddressInfoRequestDto {
    @ApiProperty()
    @IsString()
    addressLabel?: AddressType;

    @ApiProperty()
    @IsString()
    addressLine1?: string;

    @ApiProperty()
    @IsString()
    addressLine2?: string;

    @ApiProperty()
    @IsString()
    houseNo?: string;

    @ApiProperty()
    @IsString()
    buildingName?: string;

    @ApiProperty()
    @IsString()
    flatNo?: string;

    @ApiProperty()
    @IsString()
    streetName?: string;

    @ApiProperty()
    @IsString()
    streetNo?: string;

    @ApiProperty()
    @IsString()
    landmark?: string;

    @ApiProperty()
    @IsString()
    district?: string;

    @ApiProperty()
    @IsString()
    city?: string;

    @ApiProperty()
    @IsString()
    state?: string;

    @ApiProperty()
    @IsString()
    country?: string;

    @ApiProperty()
    @IsString()
    postalCode?: string;

    @ApiProperty()
    @IsString()
    phoneNumber?: string;

    @ApiProperty()
    @IsBoolean()
    isDefault?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    remarks?: string
}
export class ContactInfoRequestDto {
    @ApiProperty()
    @IsOptional()
    telephone: string

    @ApiProperty()
    @IsNotEmpty()
    mobileNo: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
}
export class KycInfoRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    kycDocumentProvided: ChooseOptions;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nominationRequired: ChooseOptions;

    @ApiProperty()
    @IsOptional()
    @IsString()
    introducerName?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    panNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    kycDocumentType: DocumentType;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    officialIdNo: string;

    @ApiProperty()
    @IsOptional()
    perAnnumIncome?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    requestedAddOn: ChooseOptions;
}
export class AddOnInfoRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    requestedDebitCard: ChooseOptions;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    eStatement: ChooseOptions;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    chequeBook: ChooseOptions;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobileBanking: ChooseOptions;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    internetBanking: ChooseOptions;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    creditCard: ChooseOptions
}
export class CreateBankAccountRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    accountInfo: AccountInfoRequestDto

    @ApiProperty()
    @IsNotEmpty()
    personalInfo: PersonalInfoRequestDto

    @ApiProperty()
    @IsNotEmpty()
    permanentAddressInfo: AddressInfoRequestDto

    @ApiProperty()
    @IsNotEmpty()
    residentialAddressInfo: AddressInfoRequestDto

    @ApiProperty()
    @IsNotEmpty()
    correspondingAddressInfo: AddressInfoRequestDto

    @ApiProperty()
    @IsNotEmpty()
    contactInfo: ContactInfoRequestDto

    @ApiProperty()
    @IsNotEmpty()
    kycInfo: KycInfoRequestDto

    @ApiProperty()
    @IsNotEmpty()
    addOnInfo: AddOnInfoRequestDto
}