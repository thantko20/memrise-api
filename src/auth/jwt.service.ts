import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../env";
import { logger } from "../common/logger";

export const verifyToken = <P extends unknown = undefined>(token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env("JWT_ACCESS_TOKEN_SECRET"), {}, (err, decoded) => {
      if (err) {
        reject(err);
      }

      resolve(decoded as JwtPayload & P);
    });
  });
};

export const signToken = (payload: string | object, opts: SignOptions = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      env("JWT_ACCESS_TOKEN_SECRET"),
      {
        ...opts,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      },
    );
  });
};
