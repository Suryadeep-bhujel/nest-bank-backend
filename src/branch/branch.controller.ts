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
  @ApiOkResponse({ type: CommonListReponse })
  @ApiOperation({ operationId: "findAll" })
  findAll(@Query() search: BranchSearchDto) {
    console.log("search", search);
    return this.branchService.findAll(search);
  }

  @Get("/branch-dropdown")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CommonListReponse })
  @ApiOperation({ operationId: "branchDropdown" })
  branchDropdown(@Query() search: BranchSearchDto) {
    return this.branchService.branchDropdown(search);
  }


  @Get(':_oid')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('_oid') _oid: string) {
    return await this.branchService.findOne(_oid);
  }

  @Patch(':_oid')
  @UseGuards(JwtAuthGuard)
  async update(@Param('_oid') _oid: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(_oid, updateBranchDto);
  }

  @Delete(':_oid')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('_oid') _oid: string) {
    return this.branchService.remove(_oid);
  }
}
