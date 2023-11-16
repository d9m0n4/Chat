import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData } from '../services/fetchUserData';
import { AuthData } from '../types/user';

const initialState: AuthData = {
  authData: undefined,
  isAuth: !!localStorage.getItem('jwt'),
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      localStorage.removeItem('jwt');
      document.cookie = '';
      state.authData = undefined;
      state.isAuth = false;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.authData = undefined;
        state.isLoading = false;
        state.isAuth = false;
      });
  },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
