import { createSlice } from '@reduxjs/toolkit';

import { fetchDialogs } from '../services/fetchDialogs';
import { IDialogData } from '../types/dialogs';

const initialState: IDialogData = { dialogData: [], searchValue: '' };
export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addNewDialog: (state, action) => {
      state.dialogData.unshift(action.payload);
    },
    setActiveDialog: (state, action) => {
      state.activeDialog = action.payload;
    },
    setUserOnline: (state, action) => {
      const { userId, isOnline } = action.payload;
      if (state.dialogData) {
        const dialogToUpdate = state.dialogData.find(
          (dialog) => dialog.partner.id === userId
        );
        if (dialogToUpdate) {
          dialogToUpdate.partner.isOnline = isOnline;
        }
      }
    },
    updateLastMessage: (state, action) => {
      const { dialog } = action.payload;
      if (state.dialogData) {
        const dialogToUpdate = state.dialogData.find(
          (dialogData) => dialogData.id === dialog.id
        );
        if (dialogToUpdate) {
          dialogToUpdate.latestMessage = {
            id: action.payload.id,
            content: action.payload.content,
            updated_at: action.payload.updated_at,
            created_at: action.payload.created_at,
          };
        }
      }
    },

    updateUnreadMessagesCount(state, action) {
      const { message, userId } = action.payload;
      const { dialog } = message;
      if (message.user.id !== userId) {
        const dialogToUpdate = state.dialogData.find(
          (dialogData) => dialogData.id === dialog.id
        );
        if (dialogToUpdate) {
          dialogToUpdate.unreadMessagesCount += 1;
        }
      }
    },

    updateMessagesCount(state, action) {
      const { dialogId, activeDialogId } = action.payload;
      if (dialogId === activeDialogId) {
        const dialog = state.dialogData.find(
          (dialog) => dialog.id === activeDialogId
        );
        if (dialog) {
          dialog.unreadMessagesCount = 0;
        }
      }
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    filterDialogs: (state, action) => {
      state.dialogData = state.dialogData.filter((dialog) =>
        dialog.partner.name.includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialogs.fulfilled, (state, action) => {
        state.dialogData = action.payload;
        state.loading = false;
      })
      .addCase(fetchDialogs.pending, (state) => {
        state.loading = true;
        state.dialogData = [];
      })
      .addCase(fetchDialogs.rejected, (state) => {
        state.error = 'error';
        state.loading = false;
      });
  },
});

export const { reducer: dialogReducer } = dialogSlice;
export const { actions: dialogActions } = dialogSlice;
