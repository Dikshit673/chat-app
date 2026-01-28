import type { NextFunction, Request, Response } from 'express';

// =========================== ASYNC REQUEST HANDLER ================================
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler =
  (fn: AsyncRequestHandler): AsyncRequestHandler =>
  async (req, res, next) =>
    fn(req, res, next).catch(next);

// =========================== REQUEST HANDLER ================================
type ReqHandler = (req: Request, res: Response, next: NextFunction) => void;

export const reqHandler =
  (fn: ReqHandler) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next);

// =========================== ERROR HANDLER ================================
type ErrorReqHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const errorHandler =
  (fn: ErrorReqHandler) =>
  (error: unknown, req: Request, res: Response, next: NextFunction) =>
    fn(error, req, res, next);
