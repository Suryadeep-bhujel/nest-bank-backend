import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdatePermissionOfRoleDto, UpdateRoleDto } from './dto/update-role.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CommonListReponse } from 'src/common/dto/ListResponseDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleSearchDto } from './dto/RoleSearchDto';
import { AuthUser } from '@src/users/decorators/user.decorator';
import { RoleDetailResponseDto } from './dto/role-detail.dto';

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreateRoleDto })
    async create(@Body() createRoleDto: CreateRoleDto, @AuthUser() user: any) {
        return await this.roleService.create(createRoleDto, user);
    }

    @Get("/list")
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: CommonListReponse })
    async findAll(@Query() search: RoleSearchDto) {
        return await this.roleService.findAll(search);
    }

    @Put("/update-permission/:oid")
    @UseGuards(JwtAuthGuard)
    // @ApiOkResponse({type: {}})
    async updatePermissionOfRole(@Param("oid") oid: string, @Body() requestBody: UpdatePermissionOfRoleDto, @AuthUser() user: any) {
        return await this.roleService.updatePermissionOfRole(oid, requestBody, user);
    }
    @Get('role-dropdown')
    @ApiOkResponse({ type: CommonListReponse })
    async roleDropdown(@Query() search: RoleSearchDto) {
        return await this.roleService.roleDropdown(search);
    }
    
    @Get(':oid')
    @ApiOkResponse({ type: RoleDetailResponseDto })
    findOne(@Param('oid') oid: string) {
        return this.roleService.findOne(oid);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(+id);
    }
}
