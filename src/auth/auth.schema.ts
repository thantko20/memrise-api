import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export type LoginBody = z.infer<typeof loginBodySchema>;

export const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
  username: z.string().min(1),
  firstname: z.string().min(1),
  lastname: z.string().min(1).optional(),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
