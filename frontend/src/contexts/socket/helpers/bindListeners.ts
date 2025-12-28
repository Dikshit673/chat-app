import type { Socket } from 'socket.io-client';

export function bindListeners<
  Events extends Record<string, readonly unknown[]>,
>(
  socket: Socket,
  events: {
    [K in keyof Events]: (...args: Events[K]) => void;
  }
) {
  (Object.keys(events) as Array<keyof Events>).forEach((event) => {
    socket.on(event as string, events[event]);
  });

  return () => {
    (Object.keys(events) as Array<keyof Events>).forEach((event) => {
      socket.off(event as string, events[event]);
    });
  };
}
