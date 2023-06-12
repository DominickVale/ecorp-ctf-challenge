import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding staffUsers")
    // Seed StaffUser
    for (let i = 0; i < 10; i++) {
        await prisma.staffUser.create({
            data: {
                level: faker.number.int({min: 1, max: 5}),
                username: faker.internet.displayName({
                    firstName: faker.person.lastName(),
                    lastName: faker.person.firstName()
                }),
                password: faker.internet.password(),
            },
        });
    }

    console.log("Seeding clients")
    // Seed Client
    for (let i = 0; i < 50; i++) {
        await prisma.client.create({
            data: {
                name: faker.person.firstName(),
                surname: faker.person.lastName(),
                age: faker.number.int({min: 18, max: 90}),
                heartrate: faker.number.int({min: 40, max: 180}),
                o2: faker.number.int({min: 70, max: 120}),
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
