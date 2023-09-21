import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { env } from "./src/env";
import { logger } from "./src/common/logger";
import { app } from "./src/app";

async function main() {
  try {
    env.validate();
    logger.info("Env validated");
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
