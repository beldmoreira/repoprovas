import { Router } from "express";
import { createTest, findAllTests } from "../controllers/testsController.js";

const testsRouter = Router();
testsRouter.post("/tests", createTest);
testsRouter.get("/tests", findAllTests);

export default testsRouter;
