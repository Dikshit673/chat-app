import type {
  CheckMeResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/features/auth/auth.types';
import API from '@/services/api';

const authuri = '/api/v1/auth';

export const registerUserService = async (credentials: RegisterPayload) => {
  const { data } = await API.post<RegisterResponse>(
    `${authuri}/register`,
    credentials
  );
  return data;
};

export const loginUserService = async (credentials: LoginPayload) => {
  const { data } = await API.post<LoginResponse>(
    `${authuri}/login`,
    credentials
  );
  return data;
};

export const logoutUserService = async () => {
  const { data } = await API.post<LogoutResponse>(`${authuri}/logout`);
  return data;
};

export const checkMeService = async () => {
  const { data } = await API.get<CheckMeResponse>(`${authuri}/check-auth`);
  return data;
};

export const refreshTokenService = async () => {
  const { data } = await API.post<RefreshResponse>(`${authuri}/refresh`);
  return data;
};
