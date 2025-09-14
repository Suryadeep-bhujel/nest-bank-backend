import { Injectable } from '@nestjs/common';
import { CreateCustomerApplicationDto } from './dto/create-customer-application.dto';
import { UpdateCustomerApplicationDto } from './dto/update-customer-application.dto';

@Injectable()
export class CustomerApplicationService {
  create(createCustomerApplicationDto: CreateCustomerApplicationDto) {
    return 'This action adds a new customerApplication';
  }

  findAll() {
    return `This action returns all customerApplication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerApplication`;
  }

  update(id: number, updateCustomerApplicationDto: UpdateCustomerApplicationDto) {
    return `This action updates a #${id} customerApplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerApplication`;
  }
}
