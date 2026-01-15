import { randomBytes } from 'crypto';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import z from 'zod';

import { MS_EXPIRY } from '@/constants.js';
import type { UserId } from '@/features/user/user.types.js';
import { AppEnvs } from '@/shared/configs/AppEnvs.js';

export const decodedTokenUserSchema = z.object({
  id: z.string().transform((v) => v as UserId),
});

export type SafeUserPayload = z.infer<typeof decodedTokenUserSchema>;

type TokenPayload = {
  id: UserId;
};

type VerifiedTokenPayload = TokenPayload & JwtPayload;

export class TokenService {
  private accessSecret = AppEnvs.ACC_JWT_SECRET;
  private refreshSecret = AppEnvs.REF_JWT_SECRET;

  // constructor() {}

  // ========================= Access Token Functions ===========================
  createAccessToken(id: UserId) {
    return jwt.sign({ id }, this.accessSecret, {
      expiresIn: MS_EXPIRY.access,
    });
  }
  verifyAccess(token: string) {
    return jwt.verify(token, this.accessSecret) as VerifiedTokenPayload;
  }

  getAccessTokenPayload(token: string) {
    const payload = this.verifyAccess(token);
    const { success, data, error } = decodedTokenUserSchema.safeParse(payload);
    if (!success) throw new Error(error.message);
    return data;
  }

  // ============================ Refresh Token Functions ===========================
  createRefreshToken(id: UserId) {
    return jwt.sign({ id }, this.refreshSecret, {
      expiresIn: MS_EXPIRY.refresh,
    });
  }
  verifyRefresh(token: string) {
    return jwt.verify(token, this.refreshSecret) as VerifiedTokenPayload;
  }

  getRefreshTokenPayload(token: string) {
    const payload = this.verifyRefresh(token);
    const { success, data, error } = decodedTokenUserSchema.safeParse(payload);
    if (!success) throw new Error(error.message);
    return data;
  }

  // ============================== CSRF Token Functions ===========================
  createCsrfToken() {
    return randomBytes(32).toString('hex');
  }
}
