import { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { BadRequestException } from "../api-exception";

export const validate = (schema: ZodSchema) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!result.success) {
      const message = result.error.format()._errors[0];
      return next(new BadRequestException(message));
    }
    next();
  };
};
