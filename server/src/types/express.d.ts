import type { IUserPayload } from '@/features/user/types/user.ts';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
      deviceId?: string;
    }
  }
}
