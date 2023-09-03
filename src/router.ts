import { Router } from "express";

import { usersRouter } from "./users/users.routes";
import { authRouter } from "./auth/auth.routes";
import { authenticate } from "./auth/authenticate.middleware";

const apiRouter = Router();

// Setup public endpoints
apiRouter.use(["/users", "/auth/login", "/auth/register"], (req, res, next) => {
  req.isPublic = true;
  next();
});
apiRouter.use(authenticate);
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);

export { apiRouter };
