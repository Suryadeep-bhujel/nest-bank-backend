import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchManagerDto } from './create-branch-manager.dto';

export class UpdateBranchManagerDto extends PartialType(CreateBranchManagerDto) {}
