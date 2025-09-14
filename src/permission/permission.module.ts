import { Module } from '@nestjs/common';
import { PermissionService } from '@src/permission/permission.service';
import { PermissionController } from '@src/permission/permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@src/permission/entities/permission.entity';
import { AppService } from '@src/app.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([Permission])
  ],
  controllers: [PermissionController],
  providers: [PermissionService, AppService],
})
export class PermissionModule {}
