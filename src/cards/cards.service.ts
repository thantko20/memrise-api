import { db } from "../db/drizzle";
import { cards } from "../db/schema";
import { CreateCard } from "./cards.schema";

export const createCard = async (
  data: Pick<CreateCard, "back" | "collectionId" | "front">,
) => {
  const [card] = await db.insert(cards).values(data).returning();
  return card;
};
