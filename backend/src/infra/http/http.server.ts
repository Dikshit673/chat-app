import type { Application } from 'express';
import http from 'http';

type ServerConfig = {
  port: number;
};

export class HttpServer {
  private server: http.Server;

  constructor(
    app: Application,
    private readonly config: ServerConfig
  ) {
    this.server = http.createServer(app);
  }

  public getHttpServer() {
    return this.server;
  }

  public start() {
    this.server.listen(this.config.port, () => {
      console.log(`🚀 HTTP Server running on ${this.config.port}`);
    });
  }

  public async shutdown() {
    return new Promise<void>((resolve) => {
      this.server.close(() => {
        console.log('✅ HTTP server closed');
        resolve();
      });
    });
  }
}
