import mongoose from 'mongoose';

import { AppEnv } from '@/lib/AppEnv.js';

const { MONGODB_URI, MONGODB_DB_NAME, MONGODB_AUTH_SOURCE } = AppEnv;

// Track listener registration
let listenersAttached = false;

function attachListeners() {
  if (listenersAttached) return;

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB runtime error:', err);
    // optional: alerting, metrics, reconnect logic
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected');
  });

  listenersAttached = true;
}

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // Already connected
  if (mongoose.connection.readyState === 1) {
    console.log('📦 Database already connected');
    return;
  }

  // Currently connecting
  if (mongoose.connection.readyState === 2) {
    console.log('⏳ Database connection in progress');
    return;
  }

  // Attach listeners only once
  attachListeners();

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME ?? 'chatsApp',
      authSource: MONGODB_AUTH_SOURCE,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    console.log(`📦 Connected to database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Failed to connect to db:', error);
    process.exit(1); // fail fast
  }
};
