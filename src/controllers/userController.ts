import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export async function signIn(req: Request, res: Response) {
  const user = req.body;
  const token = await userService.login(user);
  res.send({ token });
}

export async function signUp(req: Request, res: Response) {
  const user = req.body;
  await userService.createUser(user);
  res.sendStatus(201);
}
