import express from "express";
import { apiRouter } from "./router";
import { errorHandler } from "./common/error-handler";
import { pinoHttp } from "pino-http";
import { logger } from "./common/logger";

const app = express();

// http logger
app.use(
  pinoHttp({
    autoLogging: true,
    logger,
    customLogLevel: function (req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return "warn";
      }

      if (res.statusCode >= 500 || err) {
        return "error";
      }

      return "info";
    },
  }),
);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

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
