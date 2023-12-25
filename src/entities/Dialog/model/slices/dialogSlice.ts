import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchDialogs } from '../services/fetchDialogs';
import { IDialogData } from '../types/dialogs';

const initialState: IDialogData = {
  dialogData: [],
  searchValue: '',
};
export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addNewDialog: (state, action) => {
      state.dialogData.unshift(action.payload);
    },
    filterDialogs: (state, action) => {
      state.dialogData = state.dialogData.filter((dialog) =>
        dialog.partner.name.includes(action.payload)
      );
    },
    setActiveDialog: (state, action) => {
      state.activeDialog = action.payload;
      state.prevActiveDialogId = state.activeDialog?.id;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
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

    updateLastMessage: (state, action: PayloadAction<any>) => {
      const { dialog, updated_at, created_at, isRead, user, id, content } =
        action.payload;
      if (state.dialogData) {
        const dialogToUpdate = state.dialogData.find(
          (dialogData) => dialogData.id === dialog.id
        );
        if (dialogToUpdate) {
          dialogToUpdate.latestMessage = !action.payload.content
            ? null
            : {
                content,
                created_at,
                id,
                isRead,
                updated_at,
                user,
              };
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

    updateReadStatus: (state, action) => {
      const dialogToUpdate = state.dialogData.find(
        (dialog) => dialog.id === action.payload
      );
      if (dialogToUpdate && dialogToUpdate.latestMessage) {
        dialogToUpdate.latestMessage.isRead = true;
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
