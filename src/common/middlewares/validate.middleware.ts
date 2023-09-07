import { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { BadRequestException } from "../api-exception";

export const validate = (
  schemas: Partial<Record<"body" | "params" | "query", ZodSchema>>,
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    for (const key in Object.keys(schemas)) {
      const schema = schemas[key as keyof typeof schemas];
      if (!schema) {
        continue;
      }
      const result = schema.safeParse(req[key as keyof typeof schemas]);
      if (!result.success) {
        const message = result.error.format()._errors[0];
        return next(new BadRequestException(message));
      }
    }
    next();
  };
};
