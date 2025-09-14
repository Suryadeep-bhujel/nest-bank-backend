import { Module } from '@nestjs/common';
import { CustomerAddressesService } from './customer-addresses.service';
import { CustomerAddressesController } from './customer-addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddress } from './entities/customer-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerAddress]), // Uncomment if you have a CustomerAddress entity
    // Add any other modules that are needed for this module
  ],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
})
export class CustomerAddressesModule {}
