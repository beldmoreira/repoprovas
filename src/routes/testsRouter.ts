import { Router } from "express";
import {
  createTest,
  findTestsByDiscipline,
  findTestsByTeacher,
} from "../controllers/testsController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const testsRouter = Router();
testsRouter.post("/tests", ensureAuthenticatedMiddleware, createTest);
testsRouter.get(
  "/tests/disciplines",
  ensureAuthenticatedMiddleware,
  findTestsByDiscipline
);
testsRouter.get(
  "/tests/teachers",
  ensureAuthenticatedMiddleware,
  findTestsByTeacher
);

export default testsRouter;
