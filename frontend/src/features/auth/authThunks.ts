import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import {
  checkMeService,
  loginUserService,
  logoutUserService,
  refreshTokenService,
  registerUserService,
} from './auth.services';
import type {
  CheckMeResponse,
  ApiResponseError,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
  RegisterPayload,
  RegisterResponse,
} from './auth.types';
import { No_Network_Response, No_Server_Response } from './auth.constants';

// register
export const register = createAsyncThunk<
  RegisterResponse, // ✅ Return type when fulfilled
  RegisterPayload, // ✅ Argument type passed to the thunk
  { rejectValue: ApiResponseError } // ✅ Rejected payload type
>('auth/register', async (payload, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    // console.log('1. register thunk');
    const res = await registerUserService(payload);
    return res; // { token, user }
  } catch (error) {
    const err = error as AxiosError<ApiResponseError>;
    const { response, code } = err;
    if (code === 'ERR_NETWORK') return rejectWithValue(No_Network_Response);
    if (!response) return rejectWithValue(No_Server_Response);
    return rejectWithValue(response.data);
  }
});

// login
export const login = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: ApiResponseError }
>('auth/login', async (payload, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    // console.log('2. login thunk');
    const res = await loginUserService(payload);
    return res; // { token, user }
  } catch (error) {
    const err = error as AxiosError<ApiResponseError>;
    const { response, code } = err;
    if (code === 'ERR_NETWORK') return rejectWithValue(No_Network_Response);
    if (!response) return rejectWithValue(No_Server_Response);
    return rejectWithValue(response.data);
  }
});

// logout
export const logout = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: ApiResponseError }
>('auth/logout', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    // console.log('3. logout thunk');
    const res = await logoutUserService();
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiResponseError>;
    const { response, code } = err;
    if (code === 'ERR_NETWORK') return rejectWithValue(No_Network_Response);
    if (!response) return rejectWithValue(No_Server_Response);
    return rejectWithValue(response.data);
  }
});

// refresh
export const refresh = createAsyncThunk<
  RefreshResponse,
  void,
  { rejectValue: ApiResponseError }
>('auth/refresh', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const res = await refreshTokenService();
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiResponseError>;
    const { response, code } = err;

    if (code === 'ERR_NETWORK') return rejectWithValue(No_Network_Response);
    if (!response) return rejectWithValue(No_Server_Response);

    switch (response.status) {
      case 403: {
        console.error('🚫 [authThunks] (R4) 403 Forbidden → logout');
        dispatch(logout());
        break;
      }
      default: {
        console.error('⚠️ [authThunks] (R4) Default refresh error');
        break;
      }
    }

    return rejectWithValue(response.data);
  }
});

export const checkMe = createAsyncThunk<
  CheckMeResponse,
  void,
  { rejectValue: ApiResponseError }
>('auth/checkMe', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    const res = await checkMeService();

    return res;
  } catch (error) {
    const err = error as AxiosError<ApiResponseError>;
    const { response, code } = err;

    if (code === 'ERR_NETWORK') return rejectWithValue(No_Network_Response);
    if (!response) return rejectWithValue(No_Server_Response);

    switch (response.status) {
      case 401: {
        console.warn(
          '🔒 [authThunks] (C4) 401 Unauthorized → trying refresh()'
        );
        const refreshAction = await dispatch(refresh());
        if (refresh.fulfilled.match(refreshAction)) {
          console.info(
            '🔄 [authThunks] (C5) Token refreshed → re-checking auth'
          );
          await new Promise((r) => setTimeout(r, 100));
          dispatch(checkMe());
        } else {
          console.warn('❌ [authThunks] (C6) Refresh token failed → logout');
          dispatch(logout());
        }
        break;
      }

      case 403: {
        console.warn('🚫 [authThunks] (C7) 403 Forbidden → logout');
        dispatch(logout());
        break;
      }

      default: {
        console.warn(
          '⚠️ [authThunks] (C8) Unhandled error status:',
          response.status
        );
        break;
      }
    }

    return rejectWithValue(response.data);
  }
});
