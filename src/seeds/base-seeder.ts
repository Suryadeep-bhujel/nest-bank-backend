import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { User } from "@src/users/entities/user.entity";
import { Role } from "@src/role/entities/role.entity";
import { Permission } from "@src/permission/entities/permission.entity";
import { RoleHasPermission } from "@src/role-has-permission/entities/role-has-permission.entity";
import { Branch } from "@src/branch/entities/branch.entity";
import { BranchManager } from "@src/branch-manager/entities/branch-manager.entity";
import { Customer } from "@src/customer/entities/customer.entity";
import { CustomerAddress } from "@src/customer-addresses/entities/customer-address.entity";
import { Staff } from "@src/staff/entities/staff.entity";
import { ModelHasRole } from "@src/model-has-role/entities/model-has-role.entity";
import { BankAccount, BankAccountCustomers } from "@src/bank-account/entities/bank-account.entity";
import { Country } from "@src/country/entities/country.entity";
import { AddOnFeature } from "@src/add-on-feature/entities/add-on-feature.entity";
type EntityClass = new (...args: any[]) => any;
export class BaseSeeder {
    protected entities: EntityClass[] = []
    constructor(entities: EntityClass[]) {
        this.entities = entities;
    }
    startDBServer() {
        config();
        // You can import AppDataSource from your data source config if you have one
        console.log("Starting Seeder DB Connection")
        return new DataSource({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST as any,
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
                BankAccount,
                BankAccountCustomers,
                AddOnFeature,
                Country
            ],
            synchronize: false,
        });
    }

}