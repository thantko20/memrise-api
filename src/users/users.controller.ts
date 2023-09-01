import { NextFunction, Request, Response } from "express";
import { getUsers } from "./users.service";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
