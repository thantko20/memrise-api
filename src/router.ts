import { Router } from "express";

import { usersRouter } from "./users/users.routes";
import { authRouter } from "./auth/auth.routes";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);

export { apiRouter };
