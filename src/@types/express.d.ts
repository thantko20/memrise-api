import { User } from "../users/users.schema";

declare global {
  namespace Express {
    interface Request {
      user: User;
      isPublic?: true;
    }
  }
}
