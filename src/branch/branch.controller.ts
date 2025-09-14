import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { BranchSearchDto } from './dto/branch-search.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonListReponse } from 'src/common/dto/ListResponseDto';

@ApiTags("Branch Management")
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Post("/add-branch")
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateBranchDto })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get("/all-branches")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({type : CommonListReponse})
  @ApiOperation({ operationId: "findAll" })
  findAll(@Query() search: BranchSearchDto) {
    console.log("search", search);
    return this.branchService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
