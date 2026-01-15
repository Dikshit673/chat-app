import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Response } from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';

import { deviceIdMiddleware } from '@/middlewares/deviceId.middleware.js';
import { globalErrorMiddleware } from '@/middlewares/globalError.middleware.js';
import { AppEnvs } from '@/shared/configs/AppEnvs.js';
import { connectDB } from '@/shared/db/mongo.js';
import { sendApiResponse } from '@/utils/sendResponse.js';

import { AuthService } from './features/auth/auth.service.js';
import { TokenService } from './features/auth/token/token.service.js';
import { UserRepositoryMongo } from './features/user/user.repository.mongo.js';
import { v1Routes } from './http/v1/index.js';
import { RequiredServices } from './types/httpServices.js';

const { FRONTEND_URL } = AppEnvs;

// -------------------- Init --------------------
connectDB();

const app = express();

// -------------------- Global Middlewares --------------------
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(deviceIdMiddleware);

// -------------------- Rate Limiting (API only) --------------------
const limiter = (max: number = 20) =>
  rateLimit({
    windowMs: 60 * 1000,
    max,
    message: 'Too many requests',
  });

app.use(limiter(1000)); // Soft global protection
app.use('/api', limiter(100)); // API protection
app.use('/api/v1/auth', limiter(20)); // Auth brute-force protection

// -------------------- Routes --------------------
app.get('/', (_, res: Response) => sendApiResponse(res, 200, 'Hello World!'));

app.get('/ping', (_, res: Response) => sendApiResponse(res, 200, 'pong'));

/* ------------------ services ------------------ */
const userRepo = new UserRepositoryMongo();
const tokenService = new TokenService();
const authService = new AuthService(userRepo, tokenService);
const services: RequiredServices = { authService, tokenService };

/* ---------------- controllers ----------------- */

app.use('/api/v1', v1Routes(services));

// -------------------- Error Handling --------------------
app.use(globalErrorMiddleware);

// -------------------- Exports --------------------
export { app };
