import { createSlice } from '@reduxjs/toolkit';

import { IRightBarState } from '../types/rightBar';

const initialState: IRightBarState = {
  isOpen: false,
};
export const ToggleRightBar = createSlice({
  name: 'rightBar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { reducer: rightBarReducer } = ToggleRightBar;
export const { actions: rightBarActions } = ToggleRightBar;
