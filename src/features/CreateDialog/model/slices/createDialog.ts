import { createSlice } from '@reduxjs/toolkit';

import { findUsers } from '../services/findUsers';
import { ICreateDialog } from '../types/createDialog';

const initialState: ICreateDialog = {
  loading: false,
};
export const CreateDialogSlice = createSlice({
  name: 'searchUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findUsers.pending, (state) => {
        state.loading = true;
        state.users = undefined;
      })
      .addCase(findUsers.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload?.message;
          state.loading = false;
        } else {
          state.error = action.error.message;
          state.loading = false;
        }
      })
      .addCase(findUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      });
  },
});

export const { reducer: addDialogReducer } = CreateDialogSlice;
