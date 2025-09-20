import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, isString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsArray()
    permissionNames: string[] = []
}
