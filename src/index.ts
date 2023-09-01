import { logger } from "./common/logger";
import { app } from "./app";

function main() {
  const server = app.listen(3000, () => {
    logger.info(`Server is running on port :3000`);
  });

  ["SIGTERM", "SIGINT"].forEach((signal) => {
    process.on(signal, () => {
      server.close((err) => {
        console.log("Shutdown gracefully");
        console.log({ err });
      });
    });
  });
}

main();
