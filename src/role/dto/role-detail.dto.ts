import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@src/role/entities/role.entity";
import { Permission } from "@src/permission/entities/permission.entity";
export class RoleDetailDto {
    @ApiProperty()
    role: Partial<Role>

    @ApiProperty()
    permissions?: Partial<Permission>[]
}
export class RoleDetailResponseDto {
    @ApiProperty()
    data: RoleDetailDto
}