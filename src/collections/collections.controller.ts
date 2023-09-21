import { RequestHandler } from "express";
import {
  AddCardToCollectionBody,
  AddCardToCollectionParams,
  CreateCollectionBody,
} from "./collections.schema";
import {
  addCardToCollection,
  createCollection,
  getCollections,
} from "./collections.service";

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

export const getMyCollectionsHandler: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const result = await getCollections({ userId: req.user.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const addCardToCollectionHandler: RequestHandler<
  AddCardToCollectionParams,
  {},
  AddCardToCollectionBody
> = async (req, res, next) => {
  try {
    const result = await addCardToCollection({ ...req.body, ...req.params });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
