import { createSlice } from '@reduxjs/toolkit';

import { fetchMessages } from '../services/fetchMessages';
import { IMessagesData } from '../types/Message';

const initialState: IMessagesData = {
  messagesData: undefined,
  error: null,
  loading: false,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesData = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.messagesData = undefined;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.error = 'error';
        state.loading = false;
      });
  },
});

export const { reducer: messagesReducer } = messagesSlice;
export const { actions: messagesActions } = messagesSlice;
