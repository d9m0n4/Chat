import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { IAttachmentsState } from 'entities/ChatAttachment';
import { IDialogData } from 'entities/Dialog';
import { IMessageContextMenu, IMessagesData } from 'entities/Message';
import { INotifications } from 'entities/Notifications';
import { IUserState } from 'entities/User';
import { AuthState } from 'features/Auth';
import { ICreateDialog } from 'features/CreateDialog';
import { IModalState } from 'features/DeleteMessage';
import { IRightBarState } from 'features/ToggleRightBar';

export interface IState {
  auth: AuthState;
  user: IUserState;
  dialogs: IDialogData;
  messages: IMessagesData;
  attachments: IAttachmentsState;

  rightBar?: IRightBarState;
  messageContextMenu?: IMessageContextMenu;
  modal?: IModalState;
  notifications?: INotifications;
  addDialog?: ICreateDialog;
}

export type IStateKey = keyof IState;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IState>;
  reduce: (state: IState, action: AnyAction) => CombinedState<IState>;
  add: (key: IStateKey, reducer: Reducer) => void;
  remove: (key: IStateKey) => void;
}

export interface ReduxStoreWithReducerManager extends EnhancedStore<IState> {
  reducerManager: IReducerManager;
}
