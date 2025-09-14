import { Module } from '@nestjs/common';
import { BranchStaffService } from './branch-staff.service';
import { BranchStaffController } from './branch-staff.controller';

@Module({
  controllers: [BranchStaffController],
  providers: [BranchStaffService],
})
export class BranchStaffModule {}
