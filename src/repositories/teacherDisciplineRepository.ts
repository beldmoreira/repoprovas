import { prisma } from "../config/database.js";

export async function getByTeacherAndDiscipline(
  teacherId: number,
  disciplineId: number
) {
  return prisma.teacherDiscipline.findFirst({
    where: { AND: { disciplineId, teacherId } },
    select: { id: true },
  });
}
