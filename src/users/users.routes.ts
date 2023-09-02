import { Router } from "express";
import { getAllUsers } from "./users.controller";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);

export { usersRouter };
