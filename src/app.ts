import express from "express";
import pinoHttp from "pino-http";
import { errorHandler } from "./common/error-handler";
import { logger } from "./common/logger";
import { apiRouter } from "./router";
import { NotFoundException } from "./common/api-exception";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res, next) => {
  next(new NotFoundException());
});

app.use(errorHandler);

export { app };
