import { d } from '@pmmmwh/react-refresh-webpack-plugin/types/options';
import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { IState } from 'app/providers/storeProvider/types/Store';
import { IMessage } from 'entities/Message';
import { useStore } from 'react-redux';

import { fetchDialogs } from '../services/fetchDialogs';
import { IDialog, IDialogData } from '../types/dialogs';

const dialogEntityAdapter = createEntityAdapter<IDialog>({
  selectId: (model: IDialog) => model.id,
});

export const getDialogs = dialogEntityAdapter.getSelectors<IState>(
  (state) => state.dialogs || dialogEntityAdapter.getInitialState()
);

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: dialogEntityAdapter.getInitialState<IDialogData>({
    entities: {},
    ids: [],
    searchValue: '',
  }),
  reducers: {
    addNewDialog: (state, action) => {
      dialogEntityAdapter.setAll(state, action.payload);
    },
    filterDialogs: (state, action) => {
      dialogEntityAdapter.updateMany(state, action);
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
      const dialog = Object.values(state.entities).find(
        (dialog) => dialog?.partner.id === userId
      );

      if (dialog) {
        dialogEntityAdapter.updateOne(state, {
          id: dialog.id,
          changes: { partner: { ...dialog.partner, isOnline: isOnline } },
        });
      }
    },

    updateLastMessage: (state, action: PayloadAction<IMessage>) => {
      const { dialog, content } = action.payload;
      if (content) {
        dialogEntityAdapter.updateOne(state, {
          id: dialog.id,
          changes: { latestMessage: { ...action.payload } },
        });
      }
    },

    updateMessagesCount(state, action) {
      const { dialogId, activeDialogId } = action.payload;
      if (dialogId === activeDialogId) {
        dialogEntityAdapter.updateOne(state, {
          id: dialogId,
          changes: { unreadMessagesCount: 0 },
        });
      }
    },

    updateReadStatus: (state, action: PayloadAction<{ id: number }>) => {
      const dialog = state.entities[action.payload.id];
      if (dialog && dialog.latestMessage) {
        dialog.latestMessage.isRead = true;
      }
    },
    updateUnreadMessagesCount(state, action) {
      const { message, userId } = action.payload;
      const { dialog } = message;
      if (message.user.id !== userId) {
        const dialogToUpdate = state.entities[dialog.id];
        if (dialogToUpdate) {
          dialogToUpdate.unreadMessagesCount += 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialogs.fulfilled, (state, action) => {
        dialogEntityAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchDialogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDialogs.rejected, (state) => {
        state.error = 'error';
        state.loading = false;
      });
  },
});

export const { reducer: dialogReducers } = dialogSlice;
export const { actions: dialogActions } = dialogSlice;
