import { BadRequestException } from "../common/api-exception";
import { createUser, getUserByEmail } from "../users/users.service";
import { signToken } from "./jwt.service";
import { RegisterBody, LoginBody } from "./auth.schema";
import { logger } from "../common/logger";

export const registerUser = async (data: RegisterBody) => {
  const existingUserWithEmail = await getUserByEmail(data.email);
  if (existingUserWithEmail) {
    throw new BadRequestException("Email already exists");
  }

  const hashedPassword = await Bun.password.hash(data.password, "bcrypt");

  await createUser({ ...data, password: hashedPassword });
};

export const loginUser = async (data: LoginBody) => {
  logger.debug(data);
  const user = await getUserByEmail(data.email);
  const invalidCredentialsException = new BadRequestException(
    "Invalid email or password",
  );
  if (!user) {
    throw invalidCredentialsException;
  }

  const isCorrectPassword = await Bun.password.verify(
    data.password,
    user.password,
    "bcrypt",
  );
  if (!isCorrectPassword) {
    throw invalidCredentialsException;
  }

  const { password: _, ...rest } = user;
  const accessToken = await signToken({ user: rest });

  return { user: rest, accessToken };
};
