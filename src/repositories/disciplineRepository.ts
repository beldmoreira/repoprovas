import { prisma } from "../config/database.js";

export async function findById(id: number) {
  return prisma.discipline.findUnique({
    where: { id },
  });
}

export async function findByTerm(term: number) {
  return prisma.discipline.findMany({
    where: { termId: term },
  });
}

export async function findIdByName(name: string) {
  return prisma.discipline.findFirst({
    where: { name },
    select: { id: true },
  });
}
