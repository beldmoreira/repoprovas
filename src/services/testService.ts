import * as categoryService from "../services/categoryService.js";
import * as disciplineService from "../services/disciplineService.js";
import * as teacherDisciplineService from "../services/teacherDisciplineService.js";
import * as teacherService from "../services/teacherService.js";
import * as testRepository from "../repositories/testRepository.js";
import { TypeTestData } from "../types/TypeTestData.js";
import { notFoundError } from "../utils/errorUtils.js";

export async function createTest(body: any) {
  const category = await categoryService.findIdByName(body.category);
  if (!category) {
    throw notFoundError();
  }

  const teacher = await teacherService.findIdByName(body.teacher);
  if (!teacher) {
    throw notFoundError();
  }

  const discipline = await disciplineService.findIdByName(body.discipline);
  if (!teacher) {
    throw notFoundError();
  }

  const teacherDiscipline =
    await teacherDisciplineService.getByTeacherAndDiscipline(
      teacher.id,
      discipline.id
    );
  if (!teacherDiscipline) {
    throw notFoundError();
  }

  const test: TypeTestData = {
    name: body.name,
    pdfUrl: body.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId: teacherDiscipline.id,
  };

  await testRepository.insert(test);
}

export async function getTestsByDiscipline() {
  const tests = await testRepository.getTestsByDiscipline();
  return tests.map((term) => {
    return {
      ...term,
      disciplines: term.disciplines.map((discipline) => {
        return {
          id: discipline.id,
          name: discipline.name,
          categories: discipline.teachersDisciplines.map((categories) => {
            return categories.test.map((category) => {
              return {
                id: category.category.id,
                name: category.category.name,
                tests: category.category.tests.map((tests) => {
                  return {
                    id: tests.id,
                    name: tests.name,
                    pdfUrl: tests.pdfUrl,
                    teacher: tests.teacherDiscipline.teacher,
                  };
                }),
              };
            });
          }),
        };
      }),
    };
  });
}

export async function getTestByTeacher() {
  const tests = await testRepository.getTestByTeacher();
  return tests.map((teachers) => {
    return {
      id: teachers.teacher.id,
      name: teachers.teacher.name,
      categories: teachers.teacher.teachersDisciplines.map((categories) => {
        return categories.test.map((category) => {
          return {
            id: category.category.id,
            name: category.category.name,
            tests: {
              id: category.id,
              name: category.name,
              pdfUrl: category.pdfUrl,
              discipline: category.category.tests.map((discipline) => {
                return {
                  id: discipline.id,
                  name: discipline.name,
                  terms: discipline.teacherDiscipline.discipline.term,
                };
              }),
            },
          };
        });
      }),
    };
  });
}
