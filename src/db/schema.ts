import {
  integer,
  pgTable,
  serial,
  text,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  firstname: varchar("firstname", { length: 50 }).notNull(),
  lastname: varchar("lastname", { length: 50 }),
  email: varchar("email", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const collections = pgTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    description: varchar("description", { length: 50 }),
    userId: integer("user_id").references(() => users.id),
  },
  (t) => ({
    unq: unique().on(t.name, t.userId),
  }),
);

export const cards = pgTable(
  "cards",
  {
    id: serial("id").primaryKey(),
    front: varchar("front", { length: 100 }).notNull(),
    back: text("back").notNull(),
    collectionId: integer("collection_id").references(() => collections.id),
  },
  (t) => ({
    unq: unique().on(t.front, t.collectionId),
  }),
);
