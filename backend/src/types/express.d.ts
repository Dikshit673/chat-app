import type { SafeUserObject } from '@/models/user.model.ts';

declare module 'express' {
  interface Request {
    user?: SafeUserObject;
    deviceId?: string;
  }
}
