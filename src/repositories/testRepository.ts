import { prisma } from "../config/database.js";
import { TypeTestData } from "../types/TypeTestData.js";

export async function insert(test: TypeTestData) {
  await prisma.test.create({ data: test });
}

export async function getTestsByDiscipline() {
  return await prisma.term.findMany({
    orderBy: { number: "asc" },
    select: {
      id: true,
      number: true,
      disciplines: {
        select: {
          id: true,
          name: true,
          teachersDisciplines: {
            select: {
              test: {
                select: {
                  category: {
                    include: {
                      tests: {
                        select: {
                          id: true,
                          name: true,
                          pdfUrl: true,
                          teacherDiscipline: {
                            select: {
                              teacher: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getTestByTeacher() {
  return await prisma.teacherDiscipline.findMany({
    select: {
      teacher: {
        select: {
          id: true,
          name: true,
          teachersDisciplines: {
            select: {
              test: {
                include: {
                  category: {
                    select: {
                      id: true,
                      name: true,
                      tests: {
                        select: {
                          id: true,
                          name: true,
                          pdfUrl: true,
                          teacherDiscipline: {
                            select: {
                              discipline: {
                                select: {
                                  id: true,
                                  name: true,
                                  term: {
                                    select: {
                                      id: true,
                                      number: true,
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
