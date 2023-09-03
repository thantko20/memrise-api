import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const client = postgres({
  host: "localhost",
  username: "postgres",
  password: "password",
  port: 5432,
  database: "memrise",
});

export const db = drizzle(client, { schema, logger: true });
