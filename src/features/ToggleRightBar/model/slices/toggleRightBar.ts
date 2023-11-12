import { createSlice } from '@reduxjs/toolkit';

export const ToggleRightBar = createSlice({
  name: 'rightBar',
  initialState: { isOpened: false },
  reducers: {
    toggle: (state) => {
      state.isOpened = !state.isOpened;
    },
  },
});

export const { reducer: rightBarReducer } = ToggleRightBar;
export const { actions: rightBarActions } = ToggleRightBar;
