import { Injectable } from '@nestjs/common';
import { CreateBranchStaffDto } from './dto/create-branch-staff.dto';
import { UpdateBranchStaffDto } from './dto/update-branch-staff.dto';

@Injectable()
export class BranchStaffService {
  create(createBranchStaffDto: CreateBranchStaffDto) {
    return 'This action adds a new branchStaff';
  }

  findAll() {
    return `This action returns all branchStaff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branchStaff`;
  }

  update(id: number, updateBranchStaffDto: UpdateBranchStaffDto) {
    return `This action updates a #${id} branchStaff`;
  }

  remove(id: number) {
    return `This action removes a #${id} branchStaff`;
  }
}
