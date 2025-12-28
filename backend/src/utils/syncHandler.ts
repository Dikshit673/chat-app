import { NextFunction, Request, Response } from 'express';

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

export const syncHandler =
  (requestHandler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) =>
    requestHandler(req, res, next);
