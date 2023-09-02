import * as bcrypt from "bcrypt";

import { BadRequestException } from "../common/api-exception";
import { createUser, getUserByEmail } from "../users/users.service";
import { RegisterDto } from "./auth.schema";

export const registerUser = async (data: RegisterDto) => {
  const existingUserWithEmail = await getUserByEmail(data.email);
  if (existingUserWithEmail) {
    throw new BadRequestException("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    parseInt(process.env.BCRYPT_SALT_ROUNDS as string),
  );

  const newUser = await createUser({ ...data, password: hashedPassword });
  return newUser;
};
