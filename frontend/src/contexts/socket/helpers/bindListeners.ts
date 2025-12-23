/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Socket } from 'socket.io-client';

export function bindListeners<
  T extends Record<string, (...args: any[]) => void>,
>(socket: Socket, events: T) {
  Object.entries(events).forEach(([event, handler]) => {
    socket.on(event, handler);
  });

  return () => {
    Object.entries(events).forEach(([event, handler]) => {
      socket.off(event, handler);
    });
  };
}
