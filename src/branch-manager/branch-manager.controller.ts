import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BranchManagerService } from '@src/branch-manager/branch-manager.service';
import { CreateBranchManagerDto } from '@src/branch-manager/dto/create-branch-manager.dto';
import { UpdateBranchManagerDto } from '@src/branch-manager/dto/update-branch-manager.dto';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { ManagerSearchDto } from '@src/branch-manager/dto/manager-search.dto';
import { AuthUser } from '@src/users/decorators/user.decorator';
import { User } from '@src/users/entities/user.entity';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CommonListReponse } from 'src/common/dto/ListResponseDto';

@UseGuards(JwtAuthGuard)
@Controller('branch-manager')
export class BranchManagerController {
  constructor(private readonly branchManagerService: BranchManagerService) { }

  @Post("/add-branch-manager")
  create(@Body() createBranchManagerDto: CreateBranchManagerDto) {
    return this.branchManagerService.create(createBranchManagerDto);
  }

  @Get()
  @ApiBody({ type: ManagerSearchDto })
  @ApiOkResponse({ type: CommonListReponse })
  findAll(@Query() search: ManagerSearchDto, @AuthUser() user: User) {
    return this.branchManagerService.findAll(search, user);
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
