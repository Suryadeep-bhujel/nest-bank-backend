import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { UserSearchDto } from './dto/users-search.dto';
import { AuthUser } from './decorators/user.decorator';
import { ApiExtraModels, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommonListReponse } from 'src/common/dto/ListResponseDto';
import { UserRolesRequestDto } from './dto/user-roles-request.dto';
import { User } from './entities/user.entity';

@ApiTags("Users Management")
// @ApiExtraModels(UserSearchDto)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get("/user-list")
  @UseGuards(JwtAuthGuard)
  // @ApiQuery({ name: 'search', type: UserSearchDto })
  @ApiOkResponse({ type: CommonListReponse })
  async findAll(@Query() search: UserSearchDto, @AuthUser() user) {
    return await this.usersService.findAll(search, user);
  }

  @Get("/get-roles/:userOid")
  async getUserRoles(@Param("userOid") userOid: string, @AuthUser() user:User) {
    return await this.usersService.getRolesOfUser(userOid, user);
  }
  @Post("/assign-role/:userOid")
  @UseGuards(JwtAuthGuard)
  async assignUserRole(@Param("userOid") userOid: string, @Body() roles: UserRolesRequestDto, @AuthUser() user) {
    return await this.usersService.assignRoleToUser(userOid, roles, user)
  }

  @Get("/user-dropdown")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CommonListReponse })
  userDropdown(@Query() search: UserSearchDto) {
    return this.usersService.userDropdown(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
