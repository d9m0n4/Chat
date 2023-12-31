import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RejectedAction } from '@reduxjs/toolkit/dist/query/core/buildThunks';

import { deleteMessage } from '../services/deleteMessage';
import { fetchMessages } from '../services/fetchMessages';
import { getMessagesHistory } from '../services/getMessagesHistory';
import {
  IDeleteMessagePayload,
  IMessage,
  IMessagesData,
  INewMessagePayload,
} from '../types/Message';

const initialState: IMessagesData = {
  messagesData: undefined,
  apiMessage: undefined,
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
    deleteMessage: (state, action: PayloadAction<IDeleteMessagePayload>) => {
      const { messageId } = action.payload;
      console.log(action.payload);
      if (state.messagesData) {
        for (const date in state.messagesData) {
          state.messagesData[date] = state.messagesData[date].filter(
            (message) => message.id !== messageId
          );
        }
      }
    },
    updateMyMessageReadStatus: (state, action) => {
      const { date } = action.payload;
      const groupDate = date.substr(0, 10);
      console.log(groupDate);

      if (state.messagesData) {
        for (const date in state.messagesData) {
          if (date === groupDate) {
            state.messagesData[groupDate] = state.messagesData[groupDate].map(
              (message) =>
                !message.isRead ? { ...message, isRead: true } : message
            );
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesData = action.payload.messages;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.messagesData = undefined;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.apiMessage = 'error';
        state.loading = false;
      })
      .addCase(
        deleteMessage.fulfilled,
        (state, action: PayloadAction<IDeleteMessagePayload>) => {
          // messagesSlice.caseReducers.deleteMessage(state, action);
          state.loading = false;
        }
      )
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.apiMessage = action.error;
      })
      .addCase(getMessagesHistory.fulfilled, (state, action) => {
        const { messages, totalPages } = action.payload;

        if (!state.messagesData) {
          state.messagesData = {};
        }

        if (state.messagesData) {
          Object.keys(messages).forEach((date) => {
            if (state.messagesData && state.messagesData[date]) {
              state.messagesData[date] = [
                ...messages[date],
                ...state.messagesData[date],
              ];
            } else {
              state.messagesData = {
                [date]: messages[date],
                ...state.messagesData,
              };
            }
          });
        } else {
          state.messagesData = messages;
        }

        state.totalPages = totalPages;
        state.loading = false;
      })
      .addCase(getMessagesHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessagesHistory.rejected, (state, action) => {
        state.loading = false;
        state.apiMessage = action.error;
      });
  },
});

export const { reducer: messagesReducer } = messagesSlice;
export const { actions: messagesActions } = messagesSlice;
