import {
  getContextMenuIsOpen,
  getContextMenuMessageId,
  getContextMenuPosition,
} from 'entities/Message/model/selectors/getContextMenuState';
import { messageContextMenuActions } from 'entities/Message/model/slices/messageContextMenuSlice';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

export const useMessageContextMenu = () => {
  const dispatch = useAppDispatch();
  const position = useSelector(getContextMenuPosition);
  const messageId = useSelector(getContextMenuMessageId);
  const isOpen = useSelector(getContextMenuIsOpen);
  const handleCloseContextMenu = useCallback(() => {
    dispatch(messageContextMenuActions.toggleOpenMenu({ isOpen: false }));
  }, [dispatch]);

  return {
    isContextMenuOpened: isOpen,
    messageId,
    position,
    handleCloseContextMenu,
  };
};
