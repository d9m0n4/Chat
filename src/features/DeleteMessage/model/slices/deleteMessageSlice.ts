import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpened: false,
};
export const deleteMessageSlice = createSlice({
  name: 'deleteMessage',
  initialState,
  reducers: {
    toggleOpenModal: (state, action) => {
      state.isModalOpened = action.payload;
    },
  },
});

export const { actions: deleteMessageActions } = deleteMessageSlice;
export const { reducer: deleteMessageReducer } = deleteMessageSlice;
