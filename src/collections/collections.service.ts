import { SQL, and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { collections, users } from "../db/schema";
import { CreateCollection } from "./collections.schema";

export const getCollections = async ({ userId }: { userId?: number }) => {
  const where: SQL[] = [];
  if (userId) {
    where.push(eq(users.id, userId));
  }

  return await db
    .select()
    .from(collections)
    .where(and(...where));
};

export const createCollection = async (data: CreateCollection) => {
  return await db.insert(collections).values(data).returning();
};
