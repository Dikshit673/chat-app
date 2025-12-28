import { randomBytes } from 'crypto';

export const getCsrfToken = () => {
  const csrfToken = randomBytes(32).toString('hex');
  return csrfToken;
};
