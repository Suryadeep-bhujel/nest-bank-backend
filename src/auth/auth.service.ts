import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }


    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && bcrypt.compareSync(password, user.password)) {
            return user; // return user if valid password
        }
        return null; // return null if invalid credentials
    }

    // Login method, returns JWT token
    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        try {
            const { username, password } = loginDto;
            const user = await this.validateUser(username, password);

            if (!user) {
                throw new Error('Invalid credentials'); // Invalid credentials
            }
            const payload = { sub: user._oid, email: user.email };
            const token = this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME') || '1h', // e.g., '1h'
            });
            return {
                token: token,
                user: {
                    _oid: user._oid,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    // role: user.role,
                },
            } as LoginResponseDto;
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error('Login failed'); // Handle error appropriately   
        }
    }
    async getCurrentUser(@Req() request): Promise<LoginResponseDto> {
        // console.log("requestrequest", request.headers)
        const { _oid } = request.user;
        const { authorization } = request.headers;
        const user = await this.userRepository.findOne({ where: { _oid } });
        // const token = null; 
        if (!user) {
            throw new Error('Invalid credentials'); // Invalid credentials
        }
        return {
            token: authorization.replace("Bearer ",""),
            user: {
                _oid: user._oid,
                email: user.email,
                name: user.name,
                username: user.username,
                // role: user.role,
            },
        } as LoginResponseDto;
    }
}
