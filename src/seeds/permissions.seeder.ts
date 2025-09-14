import { AppService } from '@src/app.service';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { Permission } from '@src/permission/entities/permission.entity';
// command to run this seeder 
//npx ts-node -r tsconfig-paths/register src/seeds/permissions.seeder.ts
const initDB = new BaseSeeder([Permission])
const AppDataSource = initDB.startDBServer()
async function seed() {
    await AppDataSource.initialize();
    const branchRepo = AppDataSource.getRepository(Permission);
    const appService = new AppService();
    console.log("Mapping Bulk Data")
    let roles = [
        //role
        { name: "create-role", group: "roles" },
        { name: "update-role", group: "roles" },
        { name: "view-role", group: "roles" },
        { name: "delete-role", group: "roles" },
        { name: "list-role", group: "roles" },

        // Permissions
        { name: "assign-permission", group: "roles" },
        { name: "revoke-permission", group: "roles" },
        { name: "view-permission", group: "roles" },

        // branch manager permission
        { name: "assign-branch-manager", group: "managers" },
        { name: "revoke-branch-manager", group: "managers" },
        { name: "view-manager", group: "managers" },
        { name: "list-manager", group: "managers" },

        // applications
        { name: "view-application", group: "applications" },
        { name: "update-application", group: "applications" },
        { name: "list-application", group: "applications" },

        // customers
        { name: "create-customer", group: "customers" },
        { name: "view-customer", group: "customers" },
        { name: "delete-customer", group: "customers" },
        { name: "update-customer", group: "customers" },
        { name: "list-customer", group: "customers" },
        // customer address
        { name: "create-customer-address", group: "customers" },
        { name: "view-customer-address", group: "customers" },
        { name: "delete-customer-address", group: "customers" },
        { name: "update-customer-address", group: "customers" },
        { name: "list-customer-address", group: "customers" },

        // branch 
        { name: "create-branch", group: "branch" },
        { name: "view-branch", group: "branch" },
        { name: "update-branch", group: "branch" },
        { name: "list-branch", group: "branch" },
        { name: "delete-branch", group: "branch" },

        { name: "create-staff", group: "staff" },
        { name: "view-staff", group: "staff" },
        { name: "update-staff", group: "staff" },
        { name: "list-staff", group: "staff" },
        { name: "delete-staff", group: "staff" },
        { name: "assign-role", group: "staff" },
        { name: "revoke-role", group: "staff" },

        // customer account 
        { name: "create-customer-account", group: "customer-account" },
        { name: "update-customer-account", group:  "customer-account" },
        { name: "view-customer-account", group:  "customer-account" },
        { name: "delete-customer-account", group:  "customer-account" },
        { name: "freeze-customer-account", group:  "customer-account" },
        { name: "defreeze-customer-account", group:  "customer-account"},
        { name: "list-customer-account", group:  "customer-account" },

        // Transactions 
        { name: "view-account-transaction", group:  "account-transaction" },
        { name: "list-account-transaction", group:  "account-transaction" },
        { name: "download-account-transaction", group:  "account-transaction" },
        // { name: "list-account-transaction", group:  "account-transaction" },

        // Cards 
        { name: "add-debit-card", group:  "customer-card" },
        { name: "update-debit-card", group:  "customer-card" },
        { name: "view-debit-card", group:  "customer-card" },
        { name: "list-debit-card", group:  "customer-card" },
        { name: "add-credit-card", group:  "customer-card" },
        { name: "update-credit-card", group:  "customer-card" },
        { name: "view-credit-card", group:  "customer-card" },
        { name: "list-credit-card", group:  "customer-card" },



    ]
    roles = roles.map(roleItem => {
        Object.assign(roleItem, { _oid: appService.generateOid() })
        return roleItem;
    })
    await branchRepo.save(roles);
    console.log(`✅ Seeded ${roles.length} permissions`);
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
});
