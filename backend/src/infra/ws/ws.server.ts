import http from 'http';
import { Server, Socket } from 'socket.io';

import { WsContext } from './ws.context.js';
import { WsRouter } from './ws.router.js';

type Logger = {
  info: (msg: string) => void;
  error: (msg: string) => void;
};

export class WsServer {
  public readonly io: Server;

  constructor(
    httpServer: http.Server,
    private readonly router: WsRouter,
    private readonly context: WsContext,
    private readonly logger: Logger
  ) {
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
