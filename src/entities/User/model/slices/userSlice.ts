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
      localStorage.removeItem('jwt');
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      state.authData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.authData = undefined;
        state.isLoading = false;
      });
  },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
