import { Module } from '@nestjs/common';
import { RoleHasPermissionService } from './role-has-permission.service';
import { RoleHasPermissionController } from './role-has-permission.controller';

@Module({
  controllers: [RoleHasPermissionController],
  providers: [RoleHasPermissionService],
})
export class RoleHasPermissionModule {}
