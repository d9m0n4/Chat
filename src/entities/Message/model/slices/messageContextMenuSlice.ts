import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IMessageContextMenu } from '../types/messageContextMenu';

const initialState: IMessageContextMenu = {
  isOpen: false,
  position: { x: 0, y: 0 },
};

export const messageContextMenuSlice = createSlice({
  name: 'messageContextMenu',
  initialState,
  reducers: {
    toggleOpenMenu: (state, action: PayloadAction<IMessageContextMenu>) => {
      state.isOpen = action.payload.isOpen;
      state.messageId = action.payload.messageId;
      state.position = action.payload.position;
    },
  },
});

export const { reducer: messageContextMenuReducer } = messageContextMenuSlice;
export const { actions: messageContextMenuActions } = messageContextMenuSlice;
