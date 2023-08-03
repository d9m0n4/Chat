import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData } from '../services/fetchUserData';
import { AuthData } from '../types/user';

const initialState: AuthData = {
  authData: undefined,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      state.authData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.authData = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.authData = undefined;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.authData = undefined;
      });
  },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
