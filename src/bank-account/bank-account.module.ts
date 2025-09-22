import { Module } from '@nestjs/common';
import { BankAccountService } from '@src/bank-account/bank-account.service';
import { BankAccountController } from '@src/bank-account/bank-account.controller';
import { BankAccount, BankAccountCustomers } from '@src/bank-account/entities/bank-account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '@src/app.service';
import { Customer } from '@src/customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankAccount, Customer, BankAccountCustomers]),
  ],
  controllers: [BankAccountController],
  providers: [BankAccountService, AppService],
})
export class BankAccountModule { }
