import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchStaffDto } from './create-branch-staff.dto';

export class UpdateBranchStaffDto extends PartialType(CreateBranchStaffDto) {}
