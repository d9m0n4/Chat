import { createSlice } from '@reduxjs/toolkit';

import { User, fetchUsers } from '../services/fetchUsers';

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
export const AddDialogSlice = createSlice({
  name: 'searchUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.error = 'error';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { reducer: AddDialogReducer } = AddDialogSlice;
