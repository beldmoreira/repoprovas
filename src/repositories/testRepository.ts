import { prisma } from "../config/database.js";
import { TypeTestData } from "../types/TypeTestData.js";

export async function insert(test: TypeTestData) {
  await prisma.test.create({ data: test });
}
