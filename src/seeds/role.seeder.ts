import { AppService } from '@src/app.service';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { Role } from '@src/role/entities/role.entity';
import { Permission } from '@src/permission/entities/permission.entity';
import { RoleHasPermission } from '@src/role-has-permission/entities/role-has-permission.entity';
// command to run this seeder 
//npx ts-node -r tsconfig-paths/register src/seeds/role.seeder.ts
const initDB = new BaseSeeder([Role, RoleHasPermission])
const AppDataSource = initDB.startDBServer()
async function seed() {
    await AppDataSource.initialize();
    const roleRepo = AppDataSource.getRepository(Role);
    const appService = new AppService();
    console.log("Mapping Bulk Data")
    let roles = [
        { name: "Super Admin" },
        { name: "Admin" },
        { name: "Manager" },
        { name: "Assistent" },
        { name: "Teller/Cashier" },
        { name: "Officer" },
        { name: "Loan Officer / Mortgage Advisor" },
        { name: "Diposit Manager" },
        { name: "Branch Manager" },
        { name: "Chief Executive Officer (CEO)" },
        { name: "IT Support / Systems Administrator" },
        { name: "Security" },
        { name: "Supervisor" },
        { name: "Team Lead" },
        { name: "HR Manager / Recruiter" },
        { name: "Account Manager" },
        { name: "Account Head" },
        { name: "Director" },
        { name: "Reception" },
        { name: "Customer Support" },
        { name: "Personal Banker" },
        { name: "Sales Executive / Officer" },
        { name: "Relationship Manager" },
        { name: "Risk Manager" },
        { name: "Compliance Officer" },
        { name: "Financial Analyst" },
        { name: "Product Manager" },
        { name: "Credit Analyst" },
        { name: "Treasury Officer" },
        { name: "Operations Officer" },
        { name: "Software Developer / Engineer" },
        { name: "Database Administrator (DBA)" },
        { name: "Administrative Assistant" },
        { name: "Audit Officer" },
        { name: "Investment Banker" },
        { name: "Forex Dealer / Trader" },
        { name: "AML/KYC Analyst" },
        { name: "Cybersecurity Analyst" },
        { name: "Data Scientist / Analyst" },
        { name: "Legal Advisor" },
        { name: "Chief Financial Officer (CFO)" },
        { name: "Chief Operating Officer (COO)" },
        { name: "Chief Risk Officer (CRO)" },
        { name: "Chief Information Officer (CIO)" },
        { name: "Chief Compliance Officer (CCO)" },
        { name: "Digital Product Manager" },
        { name: "UX/UI Designer" },
        { name: "Blockchain Specialist" },
        { name: "Mobile App Developer" },
        { name: "Cloud Engineer" },
    ]
    roles = roles.map(roleItem => {
        Object.assign(roleItem, { _oid: appService.generateOid() })
        return roleItem;
    })
    await roleRepo.save(roles);
    console.log(`✅ Seeded ${roles.length} fake Roles`);
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
});
