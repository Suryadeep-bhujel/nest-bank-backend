import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchStaffService } from './branch-staff.service';
import { CreateBranchStaffDto } from './dto/create-branch-staff.dto';
import { UpdateBranchStaffDto } from './dto/update-branch-staff.dto';

@Controller('branch-staff')
export class BranchStaffController {
  constructor(private readonly branchStaffService: BranchStaffService) {}

  @Post()
  create(@Body() createBranchStaffDto: CreateBranchStaffDto) {
    return this.branchStaffService.create(createBranchStaffDto);
  }

  @Get()
  findAll() {
    return this.branchStaffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchStaffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchStaffDto: UpdateBranchStaffDto) {
    return this.branchStaffService.update(+id, updateBranchStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchStaffService.remove(+id);
  }
}
