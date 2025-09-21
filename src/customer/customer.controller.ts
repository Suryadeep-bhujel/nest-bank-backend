import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CustomerService } from '@src/customer/customer.service';
import { CreateCustomerDto } from '@src/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '@src/customer/dto/update-customer.dto';
import { User } from '@src/users/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { CustomerSearchDto } from '@src/customer/dto/customer-search.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post("/register-new-customer")
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCustomerDto: CreateCustomerDto, @User() user: any) {
    console.log("createCustomerDto", createCustomerDto, user);
    return await this.customerService.create(createCustomerDto, user);
  }

  @Get("/all-customers")
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() search: CustomerSearchDto, @User() user: any) {
    return await this.customerService.findAll(user, search);
  }

  @Get(':_oid')
  findOne(@Param('_oid') _oid: string) {
    return this.customerService.findOne(_oid);
  }

  @Patch(':_oid')
  update(@Param('_oid') _oid: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(_oid, updateCustomerDto);
  }

  @Delete(':_oid')
  remove(@Param('_oid') _oid: string) {
    return this.customerService.remove(_oid);
  }
}
