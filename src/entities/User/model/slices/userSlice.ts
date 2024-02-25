import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData } from '../services/fetchUserData';
import { updateUserInfo } from '../services/updateUserInfo';
import { IUserState } from '../types/user';

const initialState: IUserState = {
  user: undefined,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.message;
          state.isLoading = false;
        } else {
          state.error = action.error.message;
          state.isLoading = false;
        }
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.message;
          state.isLoading = false;
        } else {
          state.error = action.error.message;
          state.isLoading = false;
        }
      });
  },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
