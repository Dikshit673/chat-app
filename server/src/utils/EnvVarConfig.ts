import dotenv from 'dotenv';

dotenv.config();

const getVar = (
  key: string,
  options?: { required?: boolean; defaultValue?: string }
) => {
  const value = process.env[key] ?? options?.defaultValue;
  if (!value && options?.required !== false) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
};

const IS_DEV = getVar('NODE_ENV') === 'development';

const EnvVars = {
  // MongoDB connection string
  MONGODB_URI: getVar('MONGODB_URI'),
  MONGODB_DB_NAME: getVar('MONGODB_DB_NAME'),
  MONGODB_AUTH_SOURCE: getVar('MONGODB_AUTH_SOURCE'),

  // Cloudinary
  CLOUDINARY_API_KEY: getVar('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: getVar('CLOUDINARY_API_SECRET'),
  CLOUDINARY_CLOUD_NAME: getVar('CLOUDINARY_CLOUD_NAME'),

  // JWT
  ACC_JWT_SECRET: getVar('ACC_JWT_SECRET'),
  REF_JWT_SECRET: getVar('REF_JWT_SECRET'),

  // cookies
  ACC_COOKIE_NAME: getVar('ACC_COOKIE_NAME'),
  REF_COOKIE_NAME: getVar('REF_COOKIE_NAME'),

  // Application settings
  NODE_ENV: getVar('NODE_ENV'),
  PORT: getVar('PORT'),
  IS_DEV,

  // Client URL
  CLIENT_URL: IS_DEV ? getVar('CLIENT_URL_DEV') : getVar('CLIENT_URL_PROD'),
};

export { EnvVars, IS_DEV };
