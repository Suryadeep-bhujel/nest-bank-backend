import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerApplicationDto } from './create-customer-application.dto';

export class UpdateCustomerApplicationDto extends PartialType(CreateCustomerApplicationDto) {}
