import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchManagerService } from './branch-manager.service';
import { CreateBranchManagerDto } from './dto/create-branch-manager.dto';
import { UpdateBranchManagerDto } from './dto/update-branch-manager.dto';

@Controller('branch-manager')
export class BranchManagerController {
  constructor(private readonly branchManagerService: BranchManagerService) {}

  @Post()
  create(@Body() createBranchManagerDto: CreateBranchManagerDto) {
    return this.branchManagerService.create(createBranchManagerDto);
  }

  @Get()
  findAll() {
    return this.branchManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchManagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchManagerDto: UpdateBranchManagerDto) {
    return this.branchManagerService.update(+id, updateBranchManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchManagerService.remove(+id);
  }
}
