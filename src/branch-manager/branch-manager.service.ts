import { Injectable } from '@nestjs/common';
import { CreateBranchManagerDto } from './dto/create-branch-manager.dto';
import { UpdateBranchManagerDto } from './dto/update-branch-manager.dto';

@Injectable()
export class BranchManagerService {
  create(createBranchManagerDto: CreateBranchManagerDto) {
    return 'This action adds a new branchManager';
  }

  findAll() {
    return `This action returns all branchManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branchManager`;
  }

  update(id: number, updateBranchManagerDto: UpdateBranchManagerDto) {
    return `This action updates a #${id} branchManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} branchManager`;
  }
}
