import { createSlice } from '@reduxjs/toolkit';

import { IModalState } from '../types/modal';

const initialState: IModalState = {
  isOpen: false,
};
export const deleteMessageSlice = createSlice({
  name: 'deleteMessage',
  initialState,
  reducers: {
    toggleOpenModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { actions: deleteMessageActions } = deleteMessageSlice;
export const { reducer: deleteMessageReducer } = deleteMessageSlice;
