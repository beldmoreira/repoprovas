import * as disciplineRepository from "../repositories/disciplineRepository.js";

export async function findById(id: number) {
  return disciplineRepository.findById(id);
}

export async function findByTerm(term: number) {
  return disciplineRepository.findByTerm(term);
}

export async function findIdByName(name: string) {
  return disciplineRepository.findIdByName(name);
}
