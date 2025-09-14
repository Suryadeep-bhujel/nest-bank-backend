import { Module } from '@nestjs/common';
import { RoleService } from '@src/role/role.service';
import { RoleController } from '@src/role/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@src/role/entities/role.entity';
import { AppService } from '@src/app.service';
import { Permission } from '@src/permission/entities/permission.entity';
import { RoleHasPermission } from '@src/role-has-permission/entities/role-has-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, RoleHasPermission]),
  ],
  controllers: [RoleController],
  providers: [RoleService, AppService],
})
export class RoleModule {}
