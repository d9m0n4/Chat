import { createSlice } from '@reduxjs/toolkit';

import { login } from '../services/Login';
import { register } from '../services/Register';
import { AuthState } from '../types/auth';

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('jwt'),
  message: undefined,
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
      state.isAuth = false;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    resetMessage: (state) => {
      state.message = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.token = accessToken;
        state.isAuth = true;
        state.isLoading = false;
        state.message = undefined;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.message = action.payload?.message;
          state.isLoading = false;
        } else {
          state.message = action.error.message;
          state.isLoading = false;
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        const { nickName } = action.payload;
        state.isLoading = false;
        state.message = `Пользователь ${nickName} зарегистрирован!`;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        if (action.payload) {
          state.message = action.payload?.message;
          state.isLoading = false;
        } else {
          state.message = action.error.message;
          state.isLoading = false;
        }
      });
  },
});

export const { reducer: authReducer } = authSlice;
export const { actions: authActions } = authSlice;
