import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerBankAccountService } from './customer-bank-account.service';
import { CreateCustomerBankAccountDto } from './dto/create-customer-bank-account.dto';
import { UpdateCustomerBankAccountDto } from './dto/update-customer-bank-account.dto';

@Controller('customer-bank-account')
export class CustomerBankAccountController {
  constructor(private readonly customerBankAccountService: CustomerBankAccountService) {}

  @Post()
  create(@Body() createCustomerBankAccountDto: CreateCustomerBankAccountDto) {
    return this.customerBankAccountService.create(createCustomerBankAccountDto);
  }

  @Get()
  findAll() {
    return this.customerBankAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerBankAccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerBankAccountDto: UpdateCustomerBankAccountDto) {
    return this.customerBankAccountService.update(+id, updateCustomerBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerBankAccountService.remove(+id);
  }
}
