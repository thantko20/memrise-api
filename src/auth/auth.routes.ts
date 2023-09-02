import { Router } from "express";
import { validate } from "../common/middlewares";
import { registerSchema } from "./auth.schema";
import { registerUserHandler } from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerUserHandler);

export { authRouter };
