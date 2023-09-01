import { db } from "../db/drizzle";
import { users } from "../db/schema";

export async function getUsers() {
  const result = await db.select().from(users);
  return result;
}
