import type { IuserNoPass } from '@/features/user/types/user.ts';

declare global {
  namespace Express {
    interface Request {
      user?: IuserNoPass;
    }
  }
}
