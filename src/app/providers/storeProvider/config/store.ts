import { configureStore } from '@reduxjs/toolkit';
import { AddDialogReducer } from 'features/AddDialog/model/slices/createDialog';

export const store = configureStore({
  reducer: {
    AddDialog: AddDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
