import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    // @IsEmail()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
export class LoginResponseDto {
    token?: string;
    user: {
        _oid?: string;
        email?: string;
        name?: string;
        username?: string;
        role?: string;
    };
}