import rateLimit from 'express-rate-limit';

export const rateLimitLib = {
  limiter(max: number = 20) {
    return rateLimit({
      windowMs: 60 * 1000,
      max,
      message: 'Too many requests',
    });
  },
};
