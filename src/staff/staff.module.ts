import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    // Add any other modules that are needed for this module
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
