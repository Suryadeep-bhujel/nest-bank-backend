import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelHasRoleService } from './model-has-role.service';
import { CreateModelHasRoleDto } from './dto/create-model-has-role.dto';
import { UpdateModelHasRoleDto } from './dto/update-model-has-role.dto';

@Controller('model-has-role')
export class ModelHasRoleController {
  constructor(private readonly modelHasRoleService: ModelHasRoleService) {}

  @Post()
  create(@Body() createModelHasRoleDto: CreateModelHasRoleDto) {
    return this.modelHasRoleService.create(createModelHasRoleDto);
  }

  @Get()
  findAll() {
    return this.modelHasRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelHasRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelHasRoleDto: UpdateModelHasRoleDto) {
    return this.modelHasRoleService.update(+id, updateModelHasRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelHasRoleService.remove(+id);
  }
}
