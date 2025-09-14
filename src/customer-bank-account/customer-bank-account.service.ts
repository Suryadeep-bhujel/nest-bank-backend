import { Injectable } from '@nestjs/common';
import { CreateCustomerBankAccountDto } from './dto/create-customer-bank-account.dto';
import { UpdateCustomerBankAccountDto } from './dto/update-customer-bank-account.dto';

@Injectable()
export class CustomerBankAccountService {
  create(createCustomerBankAccountDto: CreateCustomerBankAccountDto) {
    return 'This action adds a new customerBankAccount';
  }

  findAll() {
    return `This action returns all customerBankAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerBankAccount`;
  }

  update(id: number, updateCustomerBankAccountDto: UpdateCustomerBankAccountDto) {
    return `This action updates a #${id} customerBankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerBankAccount`;
  }
}
