import { RequestHandler } from "express";
import { registerUser } from "./auth.service";
import { RegisterDto } from "./auth.schema";

export const registerUserHandler: RequestHandler<{}, {}, RegisterDto> = async (
  req,
  res,
  next,
) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
