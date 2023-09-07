import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { collections } from "../db/schema";
import { CreateCollection } from "./collections.schema";

export const getMyCollections = async ({ userId }: { userId: number }) => {
  return await db
    .select()
    .from(collections)
    .where(eq(collections.userId, userId));
};

export const createCollection = async (data: CreateCollection) => {
  return await db.insert(collections).values(data).returning();
};
