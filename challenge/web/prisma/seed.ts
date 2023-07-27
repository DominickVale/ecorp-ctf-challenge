import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {generateNeurotapIds} from "./seed.utils";

const prisma = new PrismaClient();

const secretQuestions = [
    "What is your favorite food?",
    "What brings you joy?",
    "What is your favorite animal?",
]

async function main() {
    const hashedPwd = await bcrypt.hash("cat", 10);
    // Special one
    console.log("Creating special one")
    await prisma.staffUser.create({
        data: {
            id: process.env.EXAMPLE_ID || "32FM19790306873AEB",
            level: faker.number.int(1),
            username: faker.internet.displayName({
                firstName: "Emma",
                lastName: "Turner"
            }),
            securityQuestion: secretQuestions[2],
            password: hashedPwd
        },
    });

    console.log("Seeding staffUsers")
const neurotapIds = generateNeurotapIds();
    for (let i = 0; i < 10; i++) {
        console.log(neurotapIds[i])
        const hashedPwd = await bcrypt.hash(faker.internet.password(), 10);
        await prisma.staffUser.create({
            data: {
                id: neurotapIds[i],
                level: faker.number.int({min: 0, max: 1}),
                username: faker.internet.displayName({
                    firstName: faker.person.lastName(),
                    lastName: faker.person.firstName()
                }),
                securityQuestion: faker.helpers.arrayElement(secretQuestions),
                password: hashedPwd
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
