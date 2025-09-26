import { faker } from '@faker-js/faker';
import { AppService } from '@src/app.service';
import { Customer } from '@src/customer/entities/customer.entity';
import chunk from 'lodash/chunk';
import { User } from '@src/users/entities/user.entity';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { GenderType, MaritalStatus, Occupation, PersonTitle } from '@bank-app-common/enum/SharedEnum';

//npx ts-node src/seeds/customers.seeder.ts
// run below command to seed data 
//npx ts-node -r tsconfig-paths/register src/seeds/customers.seeder.ts
const initDB = new BaseSeeder([Customer, User])
const AppDataSource = initDB.startDBServer()

async function seed() {
    await AppDataSource.initialize();
    const branchRepo = AppDataSource.getRepository(Customer);
    const appService = new AppService();
    const customers = Array.from({ length: 500000 }).map(() => {
        const customer = new Customer();
        customer._oid = appService.generateOid();
        customer.dateOfBirth = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
        customer.email = faker.internet.email();
        customer.firstName = faker.person.firstName();
        customer.middleName = faker.person.middleName();
        customer.lastName = faker.person.lastName();
        customer.gender = faker.helpers.arrayElement(Object.values(GenderType))
        customer.title = faker.helpers.arrayElement(Object.values(PersonTitle))
        customer.guardianName = faker.person.fullName();
        customer.nationality = "IN"
        customer.countryOfResidence = "IN"
        customer.occupation = faker.helpers.arrayElement(Object.values(Occupation))
        customer.maritalStatus = faker.helpers.arrayElement(Object.values(MaritalStatus))


        customer.phoneNumber = faker.phone.number({style: 'international'})
        customer.addedByStaffId = BigInt(1)
        return customer;
    });
    const batches = chunk(customers, 2000)
    for (const data of batches) {
        await branchRepo.save(data);
        console.log(`✅ Seeded ${data.length} fake customers`);
    }
    console.log(`✅ Seeded ${customers.length} fake customers`);
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
});
