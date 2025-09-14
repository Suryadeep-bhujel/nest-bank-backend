import { PartialType } from '@nestjs/swagger';
import { CreateModelHasRoleDto } from './create-model-has-role.dto';

export class UpdateModelHasRoleDto extends PartialType(CreateModelHasRoleDto) {}
