import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { CreateUser } from "./users.schema";
import { BadRequestException } from "../common/api-exception";

export const getUsers = async () => {
  const result = await db.select().from(users);
  return result;
};

export const getUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
};

export const createUser = async (data: CreateUser) => {
  const existingUserWithEmail = await getUserByEmail(data.email);
  if (existingUserWithEmail) {
    throw new BadRequestException("Email already exists");
  }

  const result = await db.insert(users).values(data).returning();
  const { password: _, ...user } = result[0];

  return user;
};
