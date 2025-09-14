import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class UserRolesRequestDto {
    @ApiProperty()
    @IsArray()
    roles: string[]
}