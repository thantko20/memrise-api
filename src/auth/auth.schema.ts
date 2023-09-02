import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(16),
  }),
});

export type LoginDto = z.infer<typeof loginSchema.shape.body>;

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(16),
    username: z.string().min(1),
    firstname: z.string().min(1),
    lastname: z.string().min(1).optional(),
  }),
});

export type RegisterDto = z.infer<typeof registerSchema.shape.body>;
