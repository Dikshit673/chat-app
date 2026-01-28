import z from 'zod';

import { UserId } from '@/features/user/user.types.js';

export const tokenUserSchema = z.object({
  id: z.string().transform((v) => v as UserId),
});

export type SafeUserPayload = z.infer<typeof tokenUserSchema>;
