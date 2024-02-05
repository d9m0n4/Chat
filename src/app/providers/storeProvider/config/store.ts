import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { attachmentsReducer } from 'entities/ChatAttachment/model/slices/attachmentSlice';
import { dialogReducers } from 'entities/Dialog/model/slices/dialogSlice';
import { messagesReducer } from 'entities/Message/model/slices/messageSlice';
import { userReducer } from 'entities/User/model/slices/userSlice';
import { authReducer } from 'features/Auth/model/slices/authSlice';

import { IState } from '../types/Store';
import { createReducerManager } from './reducerManager';

export const createStore = () => {
  const rootReducers: ReducersMapObject<IState> = {
    auth: authReducer,
    user: userReducer,
    dialogs: dialogReducers,
    messages: messagesReducer,
    attachments: attachmentsReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<IState>({
    reducer: reducerManager.reduce as Reducer<CombinedState<IState>>,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
