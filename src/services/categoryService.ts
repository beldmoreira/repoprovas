import * as categoryRepository from "../repositories/categoryRepository.js";

export async function findById(id: number) {
  return categoryRepository.findById(id);
}

export async function findCategories() {
  return categoryRepository.findCategories();
}
