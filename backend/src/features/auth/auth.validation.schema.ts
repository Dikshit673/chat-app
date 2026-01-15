import z from 'zod';

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
