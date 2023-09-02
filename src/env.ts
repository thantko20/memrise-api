import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  BCRYPT_SALT_ROUNDS: z.string(),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
});

type Env = z.infer<typeof envSchema>;

export function env(key: keyof Env) {
  const theEnv = process.env as unknown as Env;
  return theEnv[key];
}

env.validate = function () {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missingVariables = result.error.errors.map((err) => err.path);
    console.log("### Missing Variables ###");
    missingVariables.forEach((v, idx) => console.log(`${idx + 1}. ${v}`));
    throw Error("MISSING ENV VARIABLES");
  }
};
