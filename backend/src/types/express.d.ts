import { SafeJwtUserPayload } from '@/modules/auth/auth.types.ts';

declare module 'express' {
  interface Request {
    user?: SafeJwtUserPayload;
    deviceId?: string;
  }
}
