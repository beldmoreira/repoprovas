import { Request, Response } from "express";
import * as teacherService from "../services/teacherService.js";

export async function getTeacher(req: Request, res: Response) {
  const discipline = req.params;
  const teachers = await teacherService.findByDiscipline(+discipline);
  res.send(teachers);
}
