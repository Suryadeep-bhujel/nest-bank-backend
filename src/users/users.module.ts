import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from '@src/users/users.service';
import { UsersController } from '@src/users/users.controller';
import { User } from '@src/users/entities/user.entity';
import { AppService } from '@src/app.service';
import { Role } from '@src/role/entities/role.entity';
import { ModelHasRole } from '@src/model-has-role/entities/model-has-role.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, ModelHasRole])
  ],
  controllers: [UsersController],
  providers: [UsersService, AppService],
  exports: [UsersService], // Export UsersService if you want to use it in other modules
})
export class UsersModule { }
