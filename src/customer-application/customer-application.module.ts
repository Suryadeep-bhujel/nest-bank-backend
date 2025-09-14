import { Module } from '@nestjs/common';
import { CustomerApplicationService } from './customer-application.service';
import { CustomerApplicationController } from './customer-application.controller';

@Module({
  controllers: [CustomerApplicationController],
  providers: [CustomerApplicationService],
})
export class CustomerApplicationModule {}
