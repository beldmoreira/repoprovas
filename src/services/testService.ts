import * as categoryService from "../services/categoryService.js";
import * as disciplineService from "../services/disciplineService.js";
import * as teacherDisciplineService from "../services/teacherDisciplineService.js";
import * as teacherService from "../services/teacherService.js";
import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
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

export async function getAllTests() {
  return termRepository.getAll();
}
