import { faker } from '@faker-js/faker';
import { AppService } from '@src/app.service';
import { Customer } from '@src/customer/entities/customer.entity';
import chunk from 'lodash/chunk';
import { User } from '@src/users/entities/user.entity';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { ChooseOptions, DocumentType, GenderType, MaritalStatus, Occupation, PersonCaste, PersonTitle } from '@bank-app-common/enum/SharedEnum';

//npx ts-node src/seeds/customers.seeder.ts
// run below command to seed data 
//npx ts-node -r tsconfig-paths/register src/seeds/customers.seeder.ts
const initDB = new BaseSeeder([Customer, User])
const AppDataSource = initDB.startDBServer()

async function seed() {
    await AppDataSource.initialize();
    const branchRepo = AppDataSource.getRepository(Customer);
    const appService = new AppService();
    const existing = (await branchRepo.find({ select: { officialIdNo: true } })).map(item => item.officialIdNo)
    function checkDuplicate() {
        let unique = false;
        let num = faker.helpers.rangeToNumber({ min: 1000000000, max: 9000000000 });
        do {
            if (existing.indexOf(`ID${num}`) !== -1) {
                num = faker.helpers.rangeToNumber({ min: 1000000000, max: 9000000000 });
            } else {
                unique = true;
            }
            // console.log("uniqueunique", unique, existing.indexOf(`ID${num}`))
        } while (!unique)
        existing.push(`ID${num}`)
        return num;
    }
    let i=0;
    const customers = Array.from({ length: 500000 }).map((row: number) => {
        const customer = new Customer();
        let num = checkDuplicate()
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
        customer.officialIdNo = `ID${num}`
        customer.category = faker.helpers.arrayElement(Object.values(PersonCaste))
        customer.telephone = faker.phone.number({ style: 'international' })
        customer.phoneNumber = faker.phone.number({ style: 'international' })
        customer.addedByStaffId = BigInt(1)
        customer.guardianName = faker.person.fullName()
        customer.introducerName = faker.person.fullName()
        customer.kycDocumentProvided = faker.helpers.arrayElement(Object.values(ChooseOptions))
        customer.kycDocumentType = faker.helpers.arrayElement(Object.values(DocumentType))
        // customer.mobileNoCountryCode = faker.phone.number({style: 'national'})
        customer.panNumber = `PAN${num}A`
        customer.requestedDebitCard = faker.helpers.arrayElement(Object.values(ChooseOptions))
        customer.requestedAddOn = faker.helpers.arrayElement(Object.values(ChooseOptions))
        customer.perAnnumIncome = 2000
        console.log(`Data mapping in progress : ${i}`)
        i++
        return customer;
    });
    const batches = chunk(customers, 2000)
    for (const key in batches) {
        await branchRepo.save(batches[key]);
        console.log(`✅ Seeded ${batches[key].length} fake customers ${key}`);
    }
    console.log(`✅ Seeded ${customers.length} fake customers`);
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
});
