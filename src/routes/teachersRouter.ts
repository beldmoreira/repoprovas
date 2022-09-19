import { Router } from "express";
import { getTeacher } from "../controllers/teacherController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const teachersRouter = Router();
teachersRouter.get(
  "/teachers/:discipline",
  ensureAuthenticatedMiddleware,
  getTeacher
);

export default teachersRouter;
