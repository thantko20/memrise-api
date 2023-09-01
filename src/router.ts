import { Router } from "express";

import { usersRouter } from "./users/users.routes";

const apiRouter = Router();

apiRouter.use(usersRouter);

export { apiRouter };
