import * as categoryRepository from "../repositories/categoryRepository.js";

export async function findIdByName(name: string) {
  return categoryRepository.findIdByName(name);
}

export async function findCategories() {
  return categoryRepository.findCategories();
}
