import { Controller, Get, Post, Body, Res, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({ type: LoginResponseDto })
    @ApiOperation({ summary: 'Login user', operationId: 'login' })
    async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
        console.log("loginDto", loginDto);
        const result: LoginResponseDto = await this.authService.login(loginDto);
        res.status(HttpStatus.OK).json(result);
    }

    @Get("current-user")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ operationId: "currentUser" })
    @ApiOkResponse({ type: LoginResponseDto })
    async currentUser(@Req() request: Request, @Res() res: Response): Promise<any> {
        const result = await this.authService.getCurrentUser(request)
        res.status(HttpStatus.OK).json(result);
    }

}
