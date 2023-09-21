import { SQL, and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { collections, users } from "../db/schema";
import { CreateCollection } from "./collections.schema";
import { CreateCard } from "../cards/cards.schema";
import { BadRequestException } from "../common/api-exception";
import { createCard } from "../cards/cards.service";

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

export const addCardToCollection = async (data: CreateCard) => {
  const collection = await db
    .select()
    .from(collections)
    .where(eq(collections.id, data.collectionId as number));

  if (!collection) {
    throw new BadRequestException("Collection not found");
  }

  return await createCard(data);
};
