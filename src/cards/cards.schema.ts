import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { cards } from "../db/schema";

export type CreateCard = InferInsertModel<typeof cards>;
