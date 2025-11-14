import z from 'zod';

export const authheadersSchema = z
  .string()
  .refine(
    (val) => !val || /^Bearer\s+[\w-]+\.[\w-]+\.[\w-]+$/.test(val),
    'Invalid Authorization header format'
  );
export const refreshCookieSchema = z
  .string()
  .refine((val) => !val || val.length > 0, 'Invalid refresh cookie format');

export const deviceIdCookieSchema = z
  .string()
  .refine((val) => !val || val.length > 0, 'Invalid device id cookie format');

export const IUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']),
  profilePic: z.string().optional(),
});

export const userSchema = IUserSchema.extend({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authUserSchema = userSchema.omit({ password: true });

export const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  profilePic: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  profilePic: z.string().optional(),
});
