import { storage } from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';
import type { AuthUser } from './auth.types';

import { JWT_TOKEN_KEY } from './auth.constants';
import { checkMe, login, logout, refresh, register } from './authThunks';

interface AuthState {
  loading: boolean;
  error?: string | null;
  token?: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const loadTokenFromLS = () => {
  const token = storage.get<string | null>(JWT_TOKEN_KEY, null);
  return token;
};

const initialState: AuthState = {
  isAuthenticated: false, //TODO; initial false
  token: loadTokenFromLS(),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(register.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        const { jwtToken, user } = data;
        s.loading = false;
        s.error = null;
        s.user = user;
        s.token = jwtToken;
        s.isAuthenticated = true;
        storage.set(JWT_TOKEN_KEY, jwtToken);
      })
      .addCase(register.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'register failed';
        s.token = null;
        s.isAuthenticated = false;
        storage.remove(JWT_TOKEN_KEY);
      });

    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        const { jwtToken, user } = data;
        s.loading = false;
        s.error = null;
        s.user = user;
        s.token = jwtToken;
        s.isAuthenticated = true;
        storage.set(JWT_TOKEN_KEY, jwtToken);
      })
      .addCase(login.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'login failed';
        s.token = null;
        s.isAuthenticated = false;
        storage.remove(JWT_TOKEN_KEY);
      });

    builder
      .addCase(logout.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(logout.fulfilled, (s) => {
        s.loading = false;
        s.error = null;
        s.token = null;
        s.user = null;
        s.isAuthenticated = false;
        storage.remove(JWT_TOKEN_KEY);
      })
      .addCase(logout.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'logout failed';
      });

    builder
      .addCase(refresh.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(refresh.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        const { jwtToken } = data;
        s.loading = false;
        s.token = jwtToken;
        storage.set(JWT_TOKEN_KEY, jwtToken);
      })
      .addCase(refresh.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'refresh failed';
        s.token = null;
        storage.remove(JWT_TOKEN_KEY);
      });

    builder
      .addCase(checkMe.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(checkMe.fulfilled, (s, { payload }) => {
        const { data } = payload;
        if (!data) return;
        s.loading = false;
        s.isAuthenticated = true;
        s.user = data.user;
      })
      .addCase(checkMe.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload?.message || 'check auth failed';
        s.isAuthenticated = false;
      });
  },
});

const { reducer: authReducer } = authSlice;

// export const { loadAuthStateByLS } = actions;
export default authReducer;
