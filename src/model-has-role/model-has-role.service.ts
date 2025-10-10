import { Injectable } from '@nestjs/common';
import { CreateModelHasRoleDto } from './dto/create-model-has-role.dto';
import { UpdateModelHasRoleDto } from './dto/update-model-has-role.dto';

@Injectable()
export class ModelHasRoleService {
  create(createModelHasRoleDto: CreateModelHasRoleDto) {
    return 'This action adds a new UserHasRole';
  }

  findAll() {
    return `This action returns all UserHasRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} UserHasRole`;
  }

  update(id: number, updateModelHasRoleDto: UpdateModelHasRoleDto) {
    return `This action updates a #${id} UserHasRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} UserHasRole`;
  }
}
