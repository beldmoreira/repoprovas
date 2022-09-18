import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "../repositories/userRepository.js";
import { TypeUserData } from "../types/TypeUserData.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

dotenv.config({ path: ".env" });

export async function createUser(user: TypeUserData) {
  const email = await userRepository.findByEmail(user.email);
  if (email) {
    throw conflictError();
  }
  const SALT = 12;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  await userRepository.createUser({ ...user, password: hashedPassword });
}

export async function findById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw notFoundError("This user was not found");
  }
  return user;
}

export async function getUser(login: TypeUserData) {
  const user = await userRepository.findByEmail(login.email);
  if (!user) {
    throw unauthorizedError("Invalid credentials");
  }

  const isPasswordCorrect = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordCorrect) {
    throw unauthorizedError("Invalid credentials");
  }
  return user;
}

export async function login(login: TypeUserData) {
  const user = await getUser(login);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
}
