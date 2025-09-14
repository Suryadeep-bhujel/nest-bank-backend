import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerApplicationService } from './customer-application.service';
import { CreateCustomerApplicationDto } from './dto/create-customer-application.dto';
import { UpdateCustomerApplicationDto } from './dto/update-customer-application.dto';

@Controller('customer-application')
export class CustomerApplicationController {
  constructor(private readonly customerApplicationService: CustomerApplicationService) {}

  @Post()
  create(@Body() createCustomerApplicationDto: CreateCustomerApplicationDto) {
    return this.customerApplicationService.create(createCustomerApplicationDto);
  }

  @Get()
  findAll() {
    return this.customerApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerApplicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerApplicationDto: UpdateCustomerApplicationDto) {
    return this.customerApplicationService.update(+id, updateCustomerApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerApplicationService.remove(+id);
  }
}
