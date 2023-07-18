import {v4 as uuidv4} from "uuid";
import {faker} from "@faker-js/faker";

export function generateNeurotapIds() {
    return Array.from({length: 10}, () => {
        const id = uuidv4().replace(/-/g, '').toUpperCase();
        const age = faker.number.int({min: 18, max: 90})
        const sex = faker.helpers.arrayElement(['FM', 'ML']);
        const birthDate = faker.date.between({from: new Date(1930, 1, 1), to: new Date(2030, 1, 1)}).toISOString().substr(0, 10).replace(/-/g, '');
        return age + sex + birthDate + id
    })
}

export function extractIdFromUserAgent(userAgent: string) {
    const pattern = new RegExp(/^NEUROTAP-v0\.2-BEG!---(.*\d+)!---$/);
    const match = pattern.exec(userAgent);
    if (match) {
        return match[1];
    }
    return null;
}
