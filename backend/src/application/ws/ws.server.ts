import http from 'http';
import { Server, Socket } from 'socket.io';

import { Logger } from '@/services/index.js';

import { WsContext } from './ws.context.js';
import { WsRouter } from './ws.router.js';

type WsConfig = {
  router: WsRouter;
  context: WsContext;
  logger: Logger;
};

export class WsServer {
  public readonly io: Server;
  private readonly router: WsRouter;
  private readonly context: WsContext;
  private readonly logger: Logger;

  constructor(httpServer: http.Server, config: WsConfig) {
    this.logger = config.logger;
    this.router = config.router;
    this.context = config.context;

    this.io = new Server(httpServer);
    this.register();
  }

  private register() {
    this.io.on('connection', (socket: Socket) => {
      const user = socket.user;
      if (!user) return;

      const userId = user.id;

      socket.join(userId);
      this.context.onlineUsers.set(userId, socket.id);

      socket.emit('connected', {
        onlineUsers: [...this.context.onlineUsers.keys()],
      });

      this.logger.info(`🟢 WS connected userId=${userId}`);

      this.router.register(socket);

      socket.on('disconnect', () => {
        this.context.onlineUsers.delete(userId);
        this.logger.info(`🔴 WS disconnected userId=${userId}`);
      });
    });
  }

  async shutdown() {
    await new Promise<void>((resolve) => {
      this.io.close(() => resolve());
    });
  }
}
