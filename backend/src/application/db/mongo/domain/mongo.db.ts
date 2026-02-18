import mongoose from 'mongoose';

import { Logger } from '@/services/index.js';

type MongoConfig = {
  uri: string;
  options?: mongoose.ConnectOptions;
  logger: Logger;
};

export class MongoConnection {
  private listenersAttached = false;
  private hasEverConnected = false;
  private readonly logger: Logger;

  constructor(private readonly config: MongoConfig) {
    this.logger = config.logger;
  }

  async connect() {
    if (!this.config.uri) throw new Error('MONGODB_URI is not defined');
    if (!this.handleReadyState(mongoose.connection.readyState)) return; // 👈 control flow matters
    this.attachListenersOnce();

    await mongoose.connect(this.config.uri, this.config.options);
    this.hasEverConnected = true;
  }

  private handleReadyState(readyState: mongoose.ConnectionStates): boolean {
    switch (readyState) {
      case 0: {
        if (!this.hasEverConnected) {
          this.logger.debug('🗄️ Initial database connection attempt');
        } else {
          this.logger.warn('🔌 Database disconnected, attempting reconnection');
        }
        return true;
      }

      case 1:
        this.logger.debug('📦 Database already connected');
        return false;

      case 2:
        this.logger.debug('⏳ Database connection in progress');
        return false;

      case 3:
        this.logger.debug('🛑 Database disconnecting');
        return false;

      default:
        this.logger.error('❌ Unknown database connection state');
        return true;
    }
  }

  private attachListenersOnce() {
    if (this.listenersAttached) return;

    const { connection } = mongoose;

    connection.on('connected', () => {
      this.logger.debug(`🟢 MongoDB connected to database: ${connection.name}`);
    });

    connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected');
    });

    connection.on('error', (error) => {
      this.logger.error(`❌ Failed to connect to db: ${error}`);
    });

    this.listenersAttached = true;
  }
}
