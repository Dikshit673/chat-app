import z from 'zod';

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  profilePic: z.string().optional().default(''),
});

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  profilePic: z.string().optional(),
});
