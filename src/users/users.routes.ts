import { Router } from "express";
import { getAllUsers } from "./users.controller";

const usersRouter = Router();

usersRouter.get("/users", getAllUsers);

export { usersRouter };
