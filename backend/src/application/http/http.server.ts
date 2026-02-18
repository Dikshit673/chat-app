import { type Application } from 'express';
import http from 'http';

import { Logger } from '@/services/index.js';

type ServerConfig = {
  port: number;
  logger: Logger;
};

export class HttpServer {
  private readonly server: http.Server;
  private readonly logger: Logger;

  constructor(
    app: Application,
    private readonly config: ServerConfig
  ) {
    this.logger = config.logger;
    this.server = http.createServer(app);
  }

  public getServer() {
    return this.server;
  }

  public start() {
    this.server.listen(this.config.port, () => {
      this.logger.debug(`🖥️  HTTP Server running on ${this.config.port}`);
    });
  }

  public async shutdown() {
    return new Promise<void>((resolve) => {
      this.server.close(() => {
        this.logger.debug('✅ HTTP server closed');
        resolve();
      });
    });
  }
}
