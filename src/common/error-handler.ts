import type { ErrorRequestHandler } from "express";
import { BaseApiException } from "./api-exception";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BaseApiException) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal server error" });
};
