import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchDialogs } from '../services/fetchDialogs';
import { IDialogData } from '../types/dialogs';

const initialState: IDialogData = {};
export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setActiveDialog: (state, action) => {
      state.activeDialog = action.payload;
    },
    setUserOnline: (state, action) => {
      console.log(action.payload);
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
          dialogToUpdate.latestMessage = action.payload;
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
        state.dialogData = undefined;
      })
      .addCase(fetchDialogs.rejected, (state) => {
        state.error = 'error';
        state.loading = false;
      });
  },
});

export const { reducer: dialogReducer } = dialogSlice;
export const { actions: dialogActions } = dialogSlice;
