import z from 'zod';

import { userIdSchema } from '@/features/user/validation/user.schema.js';

export const accessTokenSchema = z.object({
  id: userIdSchema,
});

export type AccessTokenPayload = z.infer<typeof accessTokenSchema>;

export const refreshTokenSchema = z.object({
  id: userIdSchema,
});

export type RefreshTokenPayload = z.infer<typeof refreshTokenSchema>;
