import { EnvVars } from '@/utils/EnvVarConfig.js';
import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB_NAME, MONGODB_AUTH_SOURCE } = EnvVars;

export const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Prevent multiple connections during hot reload or multiple imports
    if (mongoose.connection.readyState === 1) {
      console.log('Database already connected');
      return;
    }

    mongoose.connection.on('connected', () => {
      console.log('✅ Database connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Database connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Database disconnected');
    });

    const connection = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME || 'chatsApp',
      authSource: MONGODB_AUTH_SOURCE || undefined,
    });

    console.log(`📦 Connected to database: ${connection.connection.name}`);
  } catch (error) {
    const err = error as Error;
    console.error('❌ Error while connecting to MongoDB:', err.message);
    process.exit(1); // stop the process if DB fails to connect
  }
};
