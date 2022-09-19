import { prisma } from "../config/database.js";

export async function findIdByName(name: string) {
  return prisma.category.findFirst({ where: { name }, select: { id: true } });
}

export async function findCategories() {
  return prisma.category.findMany();
}
