import { Module } from '@nestjs/common';
import { CustomerBankAccountService } from './customer-bank-account.service';
import { CustomerBankAccountController } from './customer-bank-account.controller';

@Module({
  controllers: [CustomerBankAccountController],
  providers: [CustomerBankAccountService],
})
export class CustomerBankAccountModule {}
