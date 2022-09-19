import { Router } from "express";
import { createTest, findAllTests } from "../controllers/testsController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const testsRouter = Router();
testsRouter.post("/tests", ensureAuthenticatedMiddleware, createTest);
testsRouter.get("/tests", ensureAuthenticatedMiddleware, findAllTests);

export default testsRouter;
