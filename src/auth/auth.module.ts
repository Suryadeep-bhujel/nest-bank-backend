import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
// This module is marked as global, meaning it can be imported in other modules without needing to be listed in their imports
// This is useful for modules that provide shared services or configurations
// like authentication, logging, etc.
// This module is responsible for authentication-related functionality
// such as user login, registration, and JWT token generation
// It imports necessary modules and services, including TypeOrmModule for database access
// and JwtModule for handling JSON Web Tokens
// It also provides the AuthService and AuthController for handling authentication requests
// The AuthService is responsible for the business logic related to authentication
// The AuthController handles incoming HTTP requests related to authentication
@Module({
  imports: [
    // ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    // JwtModule.register({
    //   secret: "test-key", // Ensure this is set
    //   // signOptions: { expiresIn: '60m' }, // Optional: expiration time
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Dynamically load the secret
        signOptions: { expiresIn: '60m' }, // Optional: Set expiration time
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtModule], // Export AuthService and JwtModule for use in other modules
  // This allows other modules to use the AuthService and JwtModule without needing to import them again
  // This is useful for shared services or configurations
  // that are used across multiple modules in the application
})
export class AuthModule { }
