import { createSlice } from '@reduxjs/toolkit';

import { User, findUsers } from '../services/findUsers';

interface CreateDialog {
  error: null | undefined | string;
  loading: boolean;
  users: User[] | undefined;
}

const initialState: CreateDialog = {
  loading: false,
  error: '',
  users: [],
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
