import type { AccessTokenPayload } from '@/features/auth/auth-tokens/index.ts';

declare module 'express' {
  interface Request {
    user?: AccessTokenPayload;
    deviceId?: string;
  }
}
