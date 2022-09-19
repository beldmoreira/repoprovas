import { prisma } from "../src/config/database.js";

async function main() {
  const terms = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
  ];
  terms.forEach(async (item) => {
    await prisma.term.upsert({
      where: { number: item.number },
      update: {},
      create: item,
    });
  });

  const categories = [
    { name: "Projeto" },
    { name: "Prática" },
    { name: "Recuperação" },
  ];
  categories.forEach(async (item) => {
    await prisma.category.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });
  });

  const teachers = [{ name: "Diego M. Pinho" }, { name: "Bruna Hamori" }];

  teachers.forEach(async (item) => {
    await prisma.teacher.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });
  });

  const disciplines = [
    { name: "HTML e CSS", termId: 1 },
    { name: "JavaScript", termId: 2 },
    { name: "React", termId: 3 },
    { name: "Humildade", termId: 1 },
    { name: "Planejamento", termId: 2 },
    { name: "Autoconfiança", termId: 3 },
  ];
  disciplines.forEach(async (item) => {
    await prisma.discipline.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });
  });

  const teacherDisciplines = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
  ];
  await prisma.teacherDiscipline.createMany({
    data: teacherDisciplines,
  });

  const tests = [
    {
      name: "Projeto Manual",
      pdfUrl: "https://www.youtube.com/watch?v=A8z7z1vogpY",
      categoryId: 1,
      teacherDisciplineId: 1,
    },
    {
      name: "Projeto Xablau",
      pdfUrl: "https://www.youtube.com/watch?v=D-OhzQyr27g",
      categoryId: 1,
      teacherDisciplineId: 2,
    },
    {
      name: "Projeto Tridente",
      pdfUrl: "https://www.youtube.com/watch?v=HA2B13yBP8Y",
      categoryId: 2,
      teacherDisciplineId: 2,
    },
  ];

  await prisma.test.createMany({
    data: tests,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
