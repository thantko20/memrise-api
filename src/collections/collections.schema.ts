import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { collections } from "../db/schema";

export const insertCollectionSchema = createInsertSchema(collections);

export type CreateCollection = z.infer<typeof insertCollectionSchema>;

export const createCollectionBodySchema = insertCollectionSchema.pick({
  name: true,
  description: true,
});

export type CreateCollectionBody = z.infer<typeof createCollectionBodySchema>;

export const addCardToCollectionBodySchema = z.object({
  front: z.string(),
  back: z.string(),
});

export type AddCardToCollectionBody = z.infer<
  typeof addCardToCollectionBodySchema
>;

export const addCardToCollectionQuerySchema = z.object({
  collectionId: z.coerce.number().positive(),
});

export type AddCardToCollectionParams = z.infer<
  typeof addCardToCollectionQuerySchema
>;
