import { Router } from "express";
import userRouter from "./userRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import disciplinesRouter from "./disciplinesRouter.js";
import teachersRouter from "./teachersRouter.js";
import testsRouter from "./testsRouter.js";

const router = Router();
router.use(userRouter);
router.use(categoriesRouter);
router.use(disciplinesRouter);
router.use(teachersRouter);
router.use(testsRouter);
export default router;
