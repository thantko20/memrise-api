import { Request, Response } from "express";
import { getUsers } from "./users.service";

export async function getAllUsers(req: Request, res: Response) {
  const users = await getUsers();
  res.send(users);
}
