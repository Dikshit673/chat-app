import { IUserDocument } from '@/models/user.model.js';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  profilePic?: string;
}

type IuserNoPassKeys = keyof Omit<IUser, 'password'>;

export type IuserNoPass = Pick<
  IUserDocument,
  '_id' | IuserNoPassKeys | 'createdAt' | 'updatedAt'
>;
