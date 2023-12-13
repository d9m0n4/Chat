import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Position = {
  x: number;
  y: number;
};
interface IMessageContextMenu {
  isOpen: boolean;
  messageId?: number;
  position?: Position;
}

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
