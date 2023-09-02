import { LoggerOptions, pino } from "pino";

const opts: LoggerOptions = {};
if (process.env.NODE_ENV === "development") {
  opts.transport = {
    target: "pino-pretty",
  };
}

const logger = pino(opts);

export { logger };
