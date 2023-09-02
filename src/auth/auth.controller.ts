import { RequestHandler } from "express";
import { loginUser, registerUser } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.schema";

export const registerUserHandler: RequestHandler<{}, {}, RegisterDto> = async (
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

export const loginUserHandler: RequestHandler<{}, {}, LoginDto> = async (
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
