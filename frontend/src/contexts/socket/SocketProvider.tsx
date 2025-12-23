import { useEffect, useState } from 'react';
import { SocketContext } from './SocketContext';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { AppEnvs } from '@/utils/AppEnvs';
import { io, type Socket } from 'socket.io-client';
import { registerAllListeners } from './listeners';

const BASE_URL = AppEnvs.VITE_API_URL;

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const newSocket = io(BASE_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
    });

    const handleConnect = () => {
      console.log('🔌 socket connected', newSocket);
      setSocket(newSocket); // ✅ external signal
    };

    const handleDisconnect = () => {
      console.log('❌ socket disconnected');
      setSocket(null);
    };

    newSocket.on('connect', handleConnect);
    newSocket.on('disconnect', handleDisconnect);

    return () => {
      newSocket.off('connect', handleConnect);
      newSocket.off('disconnect', handleDisconnect);
      newSocket.disconnect();
      setSocket(null);
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    // register feature listeners
    const cleanup = registerAllListeners(socket, dispatch);

    return () => {
      cleanup?.(); // ✅ feature-level cleanup
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
