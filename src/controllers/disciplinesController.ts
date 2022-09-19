import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineService.js";

export async function findDisciplinesByTerm(req: Request, res: Response) {
  const term = req.params;
  const disciplines = await disciplineService.findByTerm(+term);
  res.send(disciplines);
}
