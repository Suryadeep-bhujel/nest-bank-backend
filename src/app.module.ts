import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { UsersModule } from '@src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from '@src/branch/branch.module';
import { BranchManagerModule } from '@src/branch-manager/branch-manager.module';
import { StaffModule } from '@src/staff/staff.module';
import { CustomerApplicationModule } from '@src/customer-application/customer-application.module';
import { CustomerModule } from '@src/customer/customer.module';
import { CustomerBankAccountModule } from '@src/customer-bank-account/customer-bank-account.module';
import { AuthModule } from '@src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BranchStaffModule } from '@src/branch-staff/branch-staff.module';
import { CustomerAddressesModule } from '@src/customer-addresses/customer-addresses.module';
import { DateService } from '@src/date.service';
import { RoleModule } from '@src/role/role.module';
import { PermissionModule } from '@src/permission/permission.module';
import { RoleHasPermissionModule } from '@src/role-has-permission/role-has-permission.module';
import { ModelHasRoleModule } from '@src/model-has-role/model-has-role.module';
import { Role } from '@src/role/entities/role.entity';
import { RoleHasPermission } from '@src/role-has-permission/entities/role-has-permission.entity';
import { Permission } from '@src/permission/entities/permission.entity';
import { User } from '@src/users/entities/user.entity';
import { Branch } from '@src/branch/entities/branch.entity';
import { BranchManager } from '@src/branch-manager/entities/branch-manager.entity';
import { ModelHasRole } from '@src/model-has-role/entities/model-has-role.entity';
import { Customer } from '@src/customer/entities/customer.entity';
import { CustomerAddress } from '@src/customer-addresses/entities/customer-address.entity';
import { Staff } from '@src/staff/entities/staff.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any, // 'postgres' or 'mysql'
      host: process.env.DB_HOST, // or your DB host
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      entities: [
        User,
        Role,
        Permission,
        RoleHasPermission,
        Branch,
        BranchManager,
        Customer,
        CustomerAddress,
        Staff,
        ModelHasRole,
      ],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set to false in production!
      logging: false, // if you want to see SQL queries in the console
    }),
    UsersModule,
    BranchModule,
    BranchManagerModule,
    StaffModule,
    CustomerApplicationModule,
    CustomerModule,
    CustomerBankAccountModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BranchStaffModule,
    CustomerAddressesModule,
    RoleModule,
    PermissionModule,
    RoleHasPermissionModule,
    ModelHasRoleModule
  ],
  controllers: [AppController],
  providers: [AppService, DateService],
  exports: [DateService]
})
export class AppModule { }
