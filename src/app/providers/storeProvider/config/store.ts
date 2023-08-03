import { configureStore } from '@reduxjs/toolkit';
import { dialogReducer } from 'entities/Dialog/model/slices/dialogSlice';
import { userReducer } from 'entities/User/model/slices/userSlice';
import { AddDialogReducer } from 'features/AddDialog/model/slices/createDialog';

export const store = configureStore({
  reducer: {
    addDialog: AddDialogReducer,
    user: userReducer,
    dialogs: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
