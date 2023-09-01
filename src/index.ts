import { logger } from "./common/logger";
import { app } from "./app";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./db/drizzle";

async function main() {
  logger.info("Running migrations...");
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
  logger.info("Migrations completed!");

  const server = app.listen(3000, () => {
    logger.info(`Server is running on port :3000`);
  });

  ["SIGTERM", "SIGINT"].forEach((signal) => {
    process.on(signal, () => {
      server.close((err) => {
        console.log("Shutdown gracefully");
        console.log({ err });
        process.exit(0);
      });
    });
  });
}

main();
