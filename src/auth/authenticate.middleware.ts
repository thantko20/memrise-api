import { Request, RequestHandler } from "express";
import { UnauthorizedException } from "../common/api-exception";
import { verifyToken } from "./jwt.service";
import { User } from "../users/users.schema";
import { decode } from "punycode";

export const authenticate: RequestHandler = async (req, res, next) => {
  if (req.isPublic) {
    return next();
  }
  const token = extractToken(req);
  if (!token) {
    throw new UnauthorizedException("Not authenticated");
  }

  try {
    const { user } = (await verifyToken(token)) as { user: User };
    req.user = user;
    next();
  } catch {
    throw new UnauthorizedException("Not authenticated");
  }
};

function extractToken(req: Request) {
  const token =
    req.headers?.authorization?.replace("Bearer ", "") ||
    req.cookies.accessToken;
  return (token as string) || undefined;
}
