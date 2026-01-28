import { Socket } from 'socket.io';

type WsAdapter = {
  register(socket: Socket): void;
};

export class WsRouter {
  constructor(private readonly adapters: WsAdapter[]) {}

  register(socket: Socket) {
    for (const adapter of this.adapters) {
      adapter.register(socket);
    }
  }
}
