import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchMessages } from '../services/fetchMessages';
import { IMessage, IMessagesData } from '../types/Message';

interface INewMessagePayload {
  message: IMessage;
  dialogId: number | undefined;
}

const initialState: IMessagesData = {
  messagesData: undefined,
  error: null,
  loading: false,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addNewMessage: (state, action: PayloadAction<INewMessagePayload>) => {
      const { message, dialogId } = action.payload;
      const { created_at } = message;

      if (dialogId === message.dialog.id) {
        const date = created_at.substr(0, 10);
        if (state.messagesData) {
          if (!state.messagesData[date]) {
            state.messagesData[date] = [];
          }
          state.messagesData[date].push(message);
        }
      }
    },
    updateMyMessageReadStatus: (state, action) => {
      const { date } = action.payload;
      if (state.messagesData) {
        console.log(1);
        state.messagesData[date] = state.messagesData[date].map((message) =>
          message.isRead === false ? { ...message, isRead: true } : message
        );
      }
    },
  },
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
