import { prisma } from "../config/database.js";
import { TypeUserData } from "../types/TypeUserData.js";

export async function createUser(user: TypeUserData) {
  return prisma.user.create({ data: user });
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}
