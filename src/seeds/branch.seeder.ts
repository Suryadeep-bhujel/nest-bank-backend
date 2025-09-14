import { faker } from '@faker-js/faker';
import { Branch, BranchStatus } from '@src/branch/entities/branch.entity';
import { AppService } from '@src/app.service';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { User } from '@src/users/entities/user.entity';
//npx ts-node src/seeds/branch.seeder.ts
// command to run this seeder 
//npx ts-node -r tsconfig-paths/register src/seeds/branch.seeder.ts
const initDB = new BaseSeeder([Branch, User])
const AppDataSource = initDB.startDBServer()
async function seed() {
    await AppDataSource.initialize();
    const branchRepo = AppDataSource.getRepository(Branch);
    const appService = new AppService();
    console.log("Mapping Bulk Data")
    const branches = Array.from({ length: 5000 }).map((val, idx) => {
        const branch = new Branch();
        branch._oid = appService.generateOid();
        branch.branchCode = `ICICI${faker.string.alphanumeric(6).toUpperCase()}`;
        branch.branchName = faker.company.name();
        branch.branchAddress = faker.address.city();
        branch.branchPhoneNumber = faker.phone.number({style: 'international'});
        branch.branchType = faker.helpers.arrayElement(['main', 'sub']);
        branch.branchStatus = faker.helpers.arrayElement(Object.values(BranchStatus))
        branch.branchEmail = faker.internet.email()
        branch.branchWebsite = faker.internet.url()
        branch.branchDescription = faker.company.catchPhrase()
        console.log("Data map done upto: ", idx+1)
        return branch;
    });

    await branchRepo.save(branches);
    console.log(`✅ Seeded ${branches.length} fake branches`);
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
});
