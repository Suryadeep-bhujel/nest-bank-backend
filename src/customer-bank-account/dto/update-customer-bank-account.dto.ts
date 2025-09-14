import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerBankAccountDto } from './create-customer-bank-account.dto';

export class UpdateCustomerBankAccountDto extends PartialType(CreateCustomerBankAccountDto) {}
