import * as bcrypt from "bcrypt";

import { BadRequestException } from "../common/api-exception";
import { createUser, getUserByEmail } from "../users/users.service";
import { LoginDto, RegisterDto } from "./auth.schema";
import { signToken } from "./jwt.service";

export const registerUser = async (data: RegisterDto) => {
  const existingUserWithEmail = await getUserByEmail(data.email);
  if (existingUserWithEmail) {
    throw new BadRequestException("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    parseInt(process.env.BCRYPT_SALT_ROUNDS as string),
  );

  await createUser({ ...data, password: hashedPassword });
};

export const loginUser = async (data: LoginDto) => {
  const user = await getUserByEmail(data.email);
  const invalidCredentialsException = new BadRequestException(
    "Invalid email or password",
  );
  if (!user) {
    throw invalidCredentialsException;
  }

  const isCorrectPassword = await bcrypt.compare(data.password, user.password);
  if (!isCorrectPassword) {
    throw invalidCredentialsException;
  }

  const { password: _, ...rest } = user;
  const accessToken = await signToken({ user: rest });

  return { user: rest, accessToken };
};
