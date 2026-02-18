import { container } from '@/application/express/domain/app.container.js';
import { ENV, IS_PROD } from '@/configs/env/index.js';
import { Logger } from '@/services/index.js';

import { MongoConnection } from '../domain/mongo.db.js';

export const mongoDB = container.singleton(
  'MongoConnection',
  () =>
    new MongoConnection({
      uri: ENV.MONGODB_URI,
      options: {
        dbName: ENV.MONGODB_DB_NAME ?? 'chatsApp',
        authSource: ENV.MONGODB_AUTH_SOURCE,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      },
      logger: new Logger('MONGO', IS_PROD ? 'info' : 'debug'),
    })
);
