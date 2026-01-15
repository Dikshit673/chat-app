import { SafeJwtUserPayload } from '@/features/auth/auth.types.ts';

declare module 'express' {
  interface Request {
    user?: SafeJwtUserPayload;
    deviceId?: string;
  }
}
