import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ExecutionContext, CanActivate, Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // your user service
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config()
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Bearer token
    console.log("token---->", token);
    if (!token) {
      throw new ForbiddenException('No token provided. Please login.');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_SECRET') });

      // Fetch full user entity from DB using payload info (usually payload.sub or payload.userId)
      console.log("payloadpayload", payload)
      const user = await this.userService.findById(payload.email);
      console.log("user", user);
      if (!user || user === undefined) {
        throw new NotFoundException('User not found');
      }
      request.user = user; // Attach full user entity
      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new ForbiddenException('Token expired. Please login again.');
      } else if (err instanceof NotFoundException) {
        throw new ForbiddenException('User not found');
      }
      console.log("err", err)
      throw new ForbiddenException('Invalid token or user not found');
    }
  }
}
