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
      })
      .addCase(findUsers.rejected, (state) => {
        state.error = 'error';
      })
      .addCase(findUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { reducer: addDialogReducer } = CreateDialogSlice;
