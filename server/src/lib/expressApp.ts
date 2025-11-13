import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { EnvVars } from '@/utils/EnvVarConfig.js';
import { authRoutes } from '@/features/auth/routes/auth.route.js';
import { sendError } from '@/utils/sendResponse.js';
import { connectDB } from './mongoDb.js';
import { deviceIdMiddleware } from '@/middlewares/deviceId.middleware.js';

// Connect to DB
connectDB();

// Express App
const expressApp = express();

// cors options frontend whitelisting
const corsOptions = {
  origin: `${EnvVars.CLIENT_URL}`, // frontend website URL
  credentials: true, // Allows cookies
};

// Middlewares
expressApp.use(cors(corsOptions)); // whitelisting for cors
expressApp.use(express.json()); // parsing JSON request bodies
expressApp.use(express.urlencoded({ extended: true })); // parsing URL-encoded request
expressApp.use(cookieParser()); // cookie parsing
expressApp.use(deviceIdMiddleware()); // for device id

// Routes
expressApp.get('/', (_req: Request, res: Response) => res.send('Hello World!'));
expressApp.get('/ping', (_req: Request, res: Response) => res.send('pong'));
expressApp.use('/api/v1/auth', authRoutes);

expressApp.use((_req: Request, res: Response) =>
  sendError(res, 404, "This Route doesn't exists")
);

export default expressApp;
