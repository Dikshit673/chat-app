import rateLimit from 'express-rate-limit';

export function rateLimiter(max: number = 20) {
  return rateLimit({
    windowMs: 60 * 1000,
    max,
    message: 'Too many requests',
  });
}
