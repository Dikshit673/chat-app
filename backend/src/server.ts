import { createServer } from 'http';
import { Server } from 'socket.io';

import { app } from './app.js';
import { AppEnv } from './lib/AppEnv.js';
import initSocket from './socket/initSocket.js';

const { PORT, FRONTEND_URL } = AppEnv;

// -------------------- HTTP Server Init --------------------
const httpServer = createServer(app);

// -------------------- Socket.io Init --------------------
const io = new Server(httpServer, {
  pingTimeout: 60_000,
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});
initSocket(io);

// -------------------- Server listener Init --------------------
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
