import { Module } from '@nestjs/common';
import { CustomerService } from '@src/customer/customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@src/customer/entities/customer.entity';
import { CustomerAddressesModule } from '@src/customer-addresses/customer-addresses.module';
import { CustomerAddressesService } from '@src/customer-addresses/customer-addresses.service';
import { AppService } from '@src/app.service';
import { DateService } from '@src/date.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    CustomerAddressesModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerAddressesService, AppService, DateService],
})
export class CustomerModule { }
