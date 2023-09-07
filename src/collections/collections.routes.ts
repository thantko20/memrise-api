import { Router } from "express";
import { validate } from "../common/middlewares";
import { createCollectionBodySchema } from "./collections.schema";
import { createCollectionHandler } from "./collections.controller";

const collectionsRouter = Router();

collectionsRouter.get("/", (req, res) => {
  res.send("GET /collections");
});

collectionsRouter.post(
  "/",
  validate({ body: createCollectionBodySchema }),
  createCollectionHandler,
);

collectionsRouter.get("/:id", (req, res) => {
  res.send("GET /:id");
});

export { collectionsRouter };
