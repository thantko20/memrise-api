import { RequestHandler } from "express";
import { loginUser, registerUser } from "./auth.service";
import { LoginBody, RegisterBody } from "./auth.schema";

export const registerUserHandler: RequestHandler<{}, {}, RegisterBody> = async (
  req,
  res,
  next,
) => {
  try {
    await registerUser(req.body);
    res.status(201).json();
  } catch (error) {
    next(error);
  }
};

export const loginUserHandler: RequestHandler<{}, {}, LoginBody> = async (
  req,
  res,
  next,
) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
