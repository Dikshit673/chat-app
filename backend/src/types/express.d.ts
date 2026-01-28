import { SafeUserPayload } from '@/features/auth/tokens/token.schema.ts';

declare module 'express' {
  interface Request {
    user?: SafeUserPayload;
    deviceId?: string;
  }
}
