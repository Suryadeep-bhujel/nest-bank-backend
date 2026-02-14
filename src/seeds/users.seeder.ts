// src/seeds/seed.ts
// import { DataSource } from 'typeorm';
import { User, UserRole } from '@src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { BaseSeeder } from '@src/seeds/base-seeder';
import { faker } from '@faker-js/faker';
import { AppService } from '@src/app.service';
// npx ts-node -r tsconfig-paths/register src/seeds/users.seeder.ts
const initDB = new BaseSeeder([User])
const AppDataSource = initDB.startDBServer()
async function seed() {
    await AppDataSource.initialize();
    console.log("DB Initialized")
    const userRepo = AppDataSource.getRepository(User);

    const existing = await userRepo.count();
    const appService = new AppService()

    if (existing === 0) {
        try {
            await userRepo.save([
                {
                    name: 'Admin',
                    email: 'admin-user-1',
                    password: bcrypt.hashSync('admin1234', 10),
                    username: 'admin-user-1',
                    _oid: uuidv4().replace(/-/g, ''),
                    role: 'admin',
                },
                {
                    name: 'Test User',
                    email: 'test@example.com',
                    password: bcrypt.hashSync('test1234', 10),
                    username: 'testuser',
                    _oid: uuidv4().replace(/-/g, ''),
                    role: 'staff',
                },
            ]);
            console.log('✅ Seeded default users.');

        } catch (error) {
            console.error('❌ Error seeding users:', error.message);
        }
    } else {
        console.log("mapping seeder data")
        const users = Array.from({ length: 500 }).map((val, idx) => {
            const user = new User();
            user._oid = appService.generateOid()
            user.email = faker.internet.email()
            user.username = faker.internet.username()
            user.name = faker.person.fullName()
            // user.role = faker.helpers.arrayElement(Object.values(UserRole))
            user.password = bcrypt.hashSync('admin1234', 10)
            console.log("index is", idx)
            return user
        })
        console.log("seeder data map done")
        await userRepo.save(users)
        console.log('ℹ️ Users already exist. No seeding done.');
    }

    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
});
