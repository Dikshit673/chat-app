import z from 'zod';
import { authUserSchema, IUserSchema, userSchema } from '@/lib/zod.js';

export type IUser = z.infer<typeof IUserSchema>;

export type IUserObject = z.infer<typeof userSchema>;

export type IUserPayload = z.infer<typeof authUserSchema>;
