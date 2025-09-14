import { Injectable } from '@nestjs/common';
import { CreateModelHasRoleDto } from './dto/create-model-has-role.dto';
import { UpdateModelHasRoleDto } from './dto/update-model-has-role.dto';

@Injectable()
export class ModelHasRoleService {
  create(createModelHasRoleDto: CreateModelHasRoleDto) {
    return 'This action adds a new modelHasRole';
  }

  findAll() {
    return `This action returns all modelHasRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modelHasRole`;
  }

  update(id: number, updateModelHasRoleDto: UpdateModelHasRoleDto) {
    return `This action updates a #${id} modelHasRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} modelHasRole`;
  }
}
