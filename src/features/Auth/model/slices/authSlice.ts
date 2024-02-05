import { createSlice } from '@reduxjs/toolkit';

import { login } from '../services/Login';
import { AuthState } from '../types/auth';

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('jwt'),
  error: undefined,
  token: undefined,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('jwt');
      document.cookie = '';
      state.isAuth = false;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.token = accessToken;
        state.isAuth = true;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.isLoading = false;
      });
  },
});

export const { reducer: authReducer } = authSlice;
export const { actions: authActions } = authSlice;
