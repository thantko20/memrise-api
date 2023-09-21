import { Router } from "express";
import { validate } from "../common/middlewares";
import {
  addCardToCollectionBodySchema,
  addCardToCollectionQuerySchema,
  createCollectionBodySchema,
} from "./collections.schema";
import {
  addCardToCollectionHandler,
  createCollectionHandler,
} from "./collections.controller";

const collectionsRouter = Router();

collectionsRouter.get("/", (req, res) => {
  res.send("GET /collections");
});

collectionsRouter.get("/:id", (req, res) => {
  res.send("GET /:id");
});

collectionsRouter.post(
  "/",
  validate({ body: createCollectionBodySchema }),
  createCollectionHandler,
);

collectionsRouter.post(
  "/:collectionId/cards",
  validate({
    body: addCardToCollectionBodySchema,
    params: addCardToCollectionQuerySchema,
  }),
  addCardToCollectionHandler as any,
);

export { collectionsRouter };
