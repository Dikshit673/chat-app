import type { IUserNoPassDocument } from '@/models/user.model.ts';

declare global {
  namespace Express {
    interface Request {
      user?: IUserNoPassDocument; // or whatever your type is
    }
  }
}
