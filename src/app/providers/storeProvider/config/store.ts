import { configureStore } from '@reduxjs/toolkit';
import { attachmentsReducer } from 'entities/ChatAttachment/model/slices/attachmentSlice';
import { dialogReducer } from 'entities/Dialog/model/slices/dialogSlice';
import { messageContextMenuReducer } from 'entities/Message/model/slices/messageContextMenuSlice';
import { messagesReducer } from 'entities/Message/model/slices/messageSlice';
import { notificationReducer } from 'entities/Notifications/model/slices/notifications';
import { userReducer } from 'entities/User/model/slices/userSlice';
import { addDialogReducer } from 'features/CreateDialog/model/slices/createDialog';
import { deleteMessageReducer } from 'features/DeleteMessage/model/slices/deleteMessageSlice';
import { rightBarReducer } from 'features/ToggleRightBar/model/slices/toggleRightBar';

export const store = configureStore({
  reducer: {
    addDialog: addDialogReducer,
    user: userReducer,
    dialogs: dialogReducer,
    messages: messagesReducer,
    attachments: attachmentsReducer,
    rightBar: rightBarReducer,
    messageContextMenu: messageContextMenuReducer,
    modal: deleteMessageReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
