import type { User } from '../users/user.types';

export type AuthUser = User;

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error?: string | null;
};

// =============================== API PAYLOADS ==================================
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

// ============================== API RESPONSES ===========================
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ApiResponseError = ApiResponse<null>;

export type RegisterResponse = ApiResponse<{
  user: User;
  jwtToken: string;
}>;

export type LoginResponse = ApiResponse<{
  user: User;
  jwtToken: string;
}>;

export type LogoutResponse = ApiResponse<null>;

export type CheckMeResponse = ApiResponse<{
  user: User;
}>;
export type RefreshResponse = ApiResponse<{
  jwtToken: string;
}>;
