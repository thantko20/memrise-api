import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

import { logger } from "./common/logger";
import { app } from "./app";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./db/drizzle";
import { env } from "./env";

async function main() {
  try {
    env.validate();
    logger.info("Running migrations...");
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    logger.info("Migrations completed!");

    const server = app.listen(3000, () => {
      logger.info(`Server is running on port :3000`);
    });

    ["SIGTERM", "SIGINT"].forEach((signal) => {
      process.on(signal, () => {
        server.close((err) => {
          logger.info("Shutdown gracefully");
          logger.error({ err });
          process.exit(0);
        });
      });
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

main();
