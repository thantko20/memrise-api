import { Router } from "express";
import { validate } from "../common/middlewares";
import { loginBodySchema, registerBodySchema } from "./auth.schema";
import { loginUserHandler, registerUserHandler } from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/register",
  validate({ body: registerBodySchema }),
  registerUserHandler,
);
authRouter.post(
  "/login",
  validate({ body: loginBodySchema }),
  loginUserHandler,
);

export { authRouter };
