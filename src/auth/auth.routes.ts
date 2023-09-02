import { Router } from "express";
import { validate } from "../common/middlewares";
import { loginSchema, registerSchema } from "./auth.schema";
import { loginUserHandler, registerUserHandler } from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerUserHandler);
authRouter.post("/login", validate(loginSchema), loginUserHandler);

export { authRouter };
