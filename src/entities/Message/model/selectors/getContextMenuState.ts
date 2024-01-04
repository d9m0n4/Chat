import { IState } from 'app/providers/storeProvider/types/Store';

export const getContextMenuIsOpen = (state: IState) =>
  state?.messageContextMenu?.isOpen;
export const getContextMenuMessageId = (state: IState) =>
  state?.messageContextMenu?.messageId;
export const getContextMenuPosition = (state: IState) =>
  state?.messageContextMenu?.position;
