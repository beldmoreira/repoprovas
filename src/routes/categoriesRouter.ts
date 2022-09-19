import { Router } from "express";
import { findCategories } from "../controllers/categoriesController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const categoriesRouter = Router();
categoriesRouter.get(
  "/categories",
  ensureAuthenticatedMiddleware,
  findCategories
);

export default categoriesRouter;
