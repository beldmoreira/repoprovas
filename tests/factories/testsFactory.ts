import { faker } from "@faker-js/faker";

export async function createTest() {
  return {
    name: faker.vehicle.bicycle(),
    pdfUrl: faker.internet.url(),
    category: "Projeto Manual",
    discipline: "JavaScript",
    teacher: "Diego Pinho",
  };
}

const testsFactory = {
  createTest,
};
