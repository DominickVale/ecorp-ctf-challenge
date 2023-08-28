import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { generateNeurotapIds } from "./seed.utils";

const fetch = require("node-fetch");

const prisma = new PrismaClient();

const secretQuestions = [
  "What is your favorite food?",
  "What brings you joy?",
  "What is your favorite animal?",
];

async function main() {
  const hashedPwd = await bcrypt.hash("cat", 10);
  let alreadySeeded = false;
  // Special one
  console.log("Creating special one");
  try {
    await prisma.staffUser.create({
      data: {
        id: process.env.EXAMPLE_ID || "32FM19790306873AEB",
        level: 1,
        username: faker.internet.displayName({
          firstName: "Emma",
          lastName: "Turner",
        }),
        securityQuestion: secretQuestions[2],
        password: hashedPwd,
      },
    });
  } catch (e: any) {
    console.log(e);
    alreadySeeded = true;
  }
  if (alreadySeeded) return console.error("Already seeded");
  console.log("Seeding staffUsers");
  const neurotapIds = generateNeurotapIds();
  for (let i = 0; i < 10; i++) {
    console.log(neurotapIds[i]);
    const hashedPwd = await bcrypt.hash(faker.internet.password(), 10);
    try {
      await prisma.staffUser.create({
        data: {
          id: neurotapIds[i],
          level: faker.number.int({ min: 0, max: 1 }),
          username: faker.internet.displayName({
            firstName: faker.person.lastName(),
            lastName: faker.person.firstName(),
          }),
          securityQuestion: faker.helpers.arrayElement(secretQuestions),
          password: hashedPwd,
        },
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  console.log("Seeding clients");
  // Seed Client
  for (let i = 0; i < 50; i++) {
    try {
      const gender = faker.person.sex();
      const { results } = await fetch(`https://randomuser.me/api/?gender=${gender}`).then(
        (res: any) => res.json() as any
      );
      const { picture } = results[0];

      await prisma.client.create({
        data: {
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          age: faker.number.int({ min: 18, max: 90 }),
          photo: picture.medium,
          gender,
          mood: faker.helpers.arrayElement([
            "happy",
            "sad",
            "neutral",
            "angry",
            "surprised",
            "disgusted",
            "fearful",
            "calm",
            "confused",
            "aroused",
          ]),
          bank: faker.number.int({ min: 0, max: 1_000_000_000 }),
          friends: faker.number.int({ min: 0, max: 150 }),
          healthy: faker.datatype.boolean(),
          status: faker.helpers.arrayElement(["dead", "alive", "sick"]),
        },
      });
    } catch (e: any) {
      console.log(e);
    }
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
