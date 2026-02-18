import z from 'zod';

// ==================== ENV SCHEMA ====================
export const envSchema = z.object({
  // Application settings
  NODE_ENV: z.enum(['production', 'development', 'test']).default('production'),
  PORT: z.coerce.number().default(3000),

  // Bcrypt
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),

  // MongoDB
  MONGODB_URI: z
    .string()
    .refine(
      (uri) => uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'),
      {
        message: 'MongoDB URI must start with mongodb:// or mongodb+srv://',
      }
    ),
  MONGODB_DB_NAME: z.string(),
  MONGODB_AUTH_SOURCE: z.string().optional(),

  // Cloudinary
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_ROOT_FOLDER_NAME: z.string().default('chatsApp'),

  // JWT
  ACCESS_JWT_SECRET: z.string(),
  REFRESH_JWT_SECRET: z.string(),

  // URLs
  FRONTEND_URL: z.url(),
});

export type EnvType = z.infer<typeof envSchema>;
