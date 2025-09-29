import { faker } from '@faker-js/faker';
import { AppService } from '@src/app.service';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { Country } from 'src/country/entities/country.entity';
import { CountryList } from '@bank-app-common/shared-data/country-list';
import { CountryStatus, SanctionStatus } from '@bank-app-common/enum/SharedEnum';
//npx ts-node src/seeds/country.seeder.ts
// command to run this seeder 
//npx ts-node -r tsconfig-paths/register src/seeds/country.seeder.ts
const initDB = new BaseSeeder([Country])
const AppDataSource = initDB.startDBServer()
async function seed() {
    await AppDataSource.initialize();
    const countryRepo = AppDataSource.getRepository(Country);
    const appService = new AppService();
    console.log("Mapping Bulk Data")
    const duplicate: any[] = [];

    const countries = CountryList.map(countryItem => {
        // if (CountryList.filter(c => c.countryCode === countryItem.countryCode || c.countryName === countryItem.countryName || c.dialCode === countryItem.dialCode).length > 1) {
        //     duplicate.push(countryItem)
        // }
        const country = new Country();
        country._oid = appService.generateOid();
        country.countryName = countryItem.countryName;
        country.countryCode = countryItem.countryCode;
        country.dialCode = countryItem.dialCode;
        country.status = faker.helpers.arrayElement(Object.values(CountryStatus));
        country.sanctionStatus = faker.helpers.arrayElement(Object.values(SanctionStatus));
        return country;
    })
    console.log("Duplicate Records Found: ", duplicate)
    await countryRepo.save(countries);
    console.log(`✅ Seeded ${countries.length} fake countries`);
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
});
