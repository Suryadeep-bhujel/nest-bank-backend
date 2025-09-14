import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { ArrayNotEmpty, IsArray, IsIn, IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleDto extends PartialType(CreateRoleDto) { }

export class UpdatePermissionOfRoleDto {
    @ApiProperty()
    @IsArray()
    // @ArrayNotEmpty()
    // @IsInt({ each: true })
    // @Type(() => Number)
    permissionNames: string[] = []
}