import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    database: "memrise",
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password",
  },
} satisfies Config;
