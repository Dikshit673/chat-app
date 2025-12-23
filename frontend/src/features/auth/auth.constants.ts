import type { ApiResponseError } from './auth.types';

export const JWT_TOKEN_KEY = 'jwt_token';

export const No_Network_Response = {
  success: false,
  message: 'network error',
} satisfies ApiResponseError;

export const No_Server_Response = {
  success: false,
  message: 'no response by api',
} satisfies ApiResponseError;
