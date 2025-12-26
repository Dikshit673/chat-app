import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';

import { AppEnv } from '@/lib/AppEnv.js';
import { deviceIdMiddleware } from '@/middlewares/deviceId.middleware.js';
import { authRoutes } from '@/routes/auth.route.js';
import { sendApiResponse } from '@/utils/sendResponse.js';

import { connectDB } from './lib/db.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const { FRONTEND_URL } = AppEnv;

// -------------------- Init --------------------
connectDB();

const app = express();

// -------------------- Global Middlewares --------------------
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(deviceIdMiddleware());

// -------------------- Rate Limiting (API only) --------------------
const limiter = (max: number = 20) =>
  rateLimit({
    windowMs: 60 * 1000,
    max,
    message: 'Too many requests',
  });

// Soft global protection
app.use(limiter(1000));

// API protection
app.use('/api', limiter(100));

// Auth brute-force protection
app.use('/api/v1/auth', limiter(20));

// -------------------- Routes --------------------
app.get('/', (_req: Request, res: Response) =>
  sendApiResponse(res, 200, 'Hello World!')
);

app.get('/ping', (_req: Request, res: Response) =>
  sendApiResponse(res, 200, 'pong')
);

app.use('/api/v1/auth', authRoutes);

// -------------------- Error Handling --------------------
app.use(errorHandler);

// -------------------- Exports --------------------
export { app };
