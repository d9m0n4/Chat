import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData } from '../services/fetchUserData';
import { updateUserInfo } from '../services/updateUserInfo';
import { IUserState } from '../types/user';

const initialState: IUserState = {
  user: undefined,
  isAuth: !!localStorage.getItem('jwt'),
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      localStorage.removeItem('jwt');
      document.cookie = '';
      state.user = undefined;
      state.isAuth = false;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.user = undefined;
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
