import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./src/db/drizzle";
import { logger } from "./src/common/logger";

logger.info("Started Migrations");
await migrate(db, { migrationsFolder: "migrations" });
logger.info("Completed migrations");

process.exit(0);
