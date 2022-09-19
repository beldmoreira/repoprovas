import { Router } from "express";
import { findDisciplinesByTerm } from "../controllers/disciplinesController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const disciplinesRouter = Router();
disciplinesRouter.get(
  "/disciplines/:term",
  ensureAuthenticatedMiddleware,
  findDisciplinesByTerm
);

export default disciplinesRouter;
