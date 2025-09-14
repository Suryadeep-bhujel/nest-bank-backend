import { PartialType } from '@nestjs/swagger';
import { CreateRoleHasPermissionDto } from './create-role-has-permission.dto';

export class UpdateRoleHasPermissionDto extends PartialType(CreateRoleHasPermissionDto) {}
