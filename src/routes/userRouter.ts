import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.post("/signup", validateSchemaMiddleware(userSchema), signUp);
userRouter.post("/signin", validateSchemaMiddleware(userSchema), signIn);
export default userRouter;
