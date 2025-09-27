import { faker } from '@faker-js/faker';
import { AppService } from '@src/app.service';
import { Customer } from '@src/customer/entities/customer.entity';
import chunk from 'lodash/chunk';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { BankAccount, BankAccountCustomers } from '@src/bank-account/entities/bank-account.entity';
import { BankAccountStatusType } from '@bank-app-common/enum/SharedEnum';
import { Branch } from '@src/branch/entities/branch.entity';

//npx ts-node src/seeds/customers.seeder.ts
// run below command to seed data 
//npx ts-node -r tsconfig-paths/register src/seeds/bank-account.seeder.ts
const initDB = new BaseSeeder([Customer, BankAccount, BankAccountCustomers])
const AppDataSource = initDB.startDBServer()

async function seed() {
    await AppDataSource.initialize();
    const customerRepo = AppDataSource.getRepository(Customer);
    const customers = await customerRepo.find({ select: { id: true } });
    console.log("Total customers found", customers.length)

    const brancheRepo = AppDataSource.getRepository(Branch)
    const branches = await brancheRepo.find({ select: { _oid: true, id: true } })
    const appService = new AppService();
    const accountRepo = AppDataSource.getRepository(BankAccount);
    const latestAccount = await accountRepo.find({ order: { id: 'DESC' }, take: 1 });
    let lastAccountNumber = 'BA000001';
    if (latestAccount.length > 0) {
        lastAccountNumber = latestAccount[0].accountNumber;
    }
    let totalAccounts = 0;
    for (let index = 0; index < 70; index++) {
        const accounts = Array.from({ length: 100000 }).map(() => {
            const account = new BankAccount();
            account.branchOid = faker.helpers.arrayElement(branches)?._oid;
            lastAccountNumber = 'BA' + (parseInt(lastAccountNumber.replace(/\D/g, '')) + 1).toString().padStart(6, '0');
            account._oid = appService.generateOid();
            account.accountNumber = lastAccountNumber;
            account.status = faker.helpers.arrayElement(Object.values(BankAccountStatusType));
            // account.balance = "0.00";
            account.accountType = faker.helpers.arrayElement(['savings', 'checking']);
            account.currency = faker.helpers.arrayElement(['USD', 'EUR', 'GBP']);
            return account;
        });
        totalAccounts += accounts.length
        const batches = chunk(accounts, 2000)
        const customerBankArr: BankAccountCustomers[] = [];
        for (const data of batches) {
            const accounts = await accountRepo.save(data);
            accounts.map((account) => {
                const accountCustomer = new BankAccountCustomers();
                accountCustomer.customerId = faker.helpers.arrayElement(customers)?.id;
                accountCustomer.bankAccountId = account.id;
                accountCustomer._oid = appService.generateOid();
                accountCustomer.createdAt = faker.date.past();
                accountCustomer.updatedAt = faker.date.recent();
                customerBankArr.push(accountCustomer);
            })
            console.log(`✅ Seeded ${data.length} fake bank accounts : ${index}`);
        }
        const customerBatches = chunk(customerBankArr, 2000);
        for (const data of customerBatches) {
            await AppDataSource.getRepository(BankAccountCustomers).save(data);
            console.log(`✅ Seeded ${data.length} fake customer-bank account relationships`);
        }
    }

    console.log(`✅ Seeded ${totalAccounts} fake customer-bank account relationships`);
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Bank Account Seeder failed:', err);
    process.exit(1);
});
