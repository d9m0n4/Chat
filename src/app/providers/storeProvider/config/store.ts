import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { attachmentsReducer } from 'entities/ChatAttachment/model/slices/attachmentSlice';
import { dialogReducer } from 'entities/Dialog/model/slices/dialogSlice';
import { messagesReducer } from 'entities/Message/model/slices/messageSlice';
import { userReducer } from 'entities/User/model/slices/userSlice';

import { IState } from '../types/Store';
import { createReducerManager } from './reducerManager';

export const createStore = (acyncReducers?: ReducersMapObject<IState>) => {
  const rootReducers: ReducersMapObject<IState> = {
    ...acyncReducers,
    auth: userReducer,
    dialogs: dialogReducer,
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
