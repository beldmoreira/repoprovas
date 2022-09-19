import * as teacherRepository from "../repositories/teacherRepository.js";

export async function findById(id: number) {
  return teacherRepository.findById(id);
}

export async function findByDiscipline(discipline: number) {
  return teacherRepository.findByDiscipline(discipline);
}

export async function findIdByName(name: string) {
  return teacherRepository.findIdByName(name);
}
