import z from 'zod';

import type { UserId } from './user.types.js';

export const userIdSchema = z.string().transform((v) => v as UserId);

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  profilePic: z.string().optional(),
});

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
