import { prisma } from "../config/database.js";

export async function findById(id: number) {
  return prisma.teacher.findUnique({
    where: { id },
  });
}

export async function findByDiscipline(discipline: number) {
  return prisma.teacher.findMany({
    where: { teachersDisciplines: { some: { disciplineId: discipline } } },
  });
}

export async function findIdByName(name: string) {
  return prisma.teacher.findFirst({ where: { name }, select: { id: true } });
}
