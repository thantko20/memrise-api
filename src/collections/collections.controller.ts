import { RequestHandler } from "express";
import { CreateCollectionBody } from "./collections.schema";
import { createCollection } from "./collections.service";

export const createCollectionHandler: RequestHandler<
  {},
  {},
  CreateCollectionBody
> = async (req, res, next) => {
  try {
    const result = await createCollection({ ...req.body, userId: req.user.id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
