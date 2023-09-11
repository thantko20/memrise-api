import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

import { env } from "./src/env";
import { logger } from "./src/common/logger";
import { app } from "./src/app";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./src/db/drizzle";

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
