import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { INotifications } from '../types/notification';

const initialState: INotifications = {
  notifications: [],
};
export const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<{ message: string }>) => {
      const uniqueId = uuidv4();
      const notificationWithId = { ...action.payload, id: uniqueId };
      state.notifications.push(notificationWithId);
    },
    clearNotification: (state, action: PayloadAction<{ id: string }>) => {
      console.log(action.payload);
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id
      );
    },
  },
});

export const { reducer: notificationReducer } = notifications;
export const { actions: notificationActions } = notifications;
