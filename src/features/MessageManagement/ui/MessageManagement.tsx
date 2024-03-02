import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { SerializedError } from '@reduxjs/toolkit';
import { getContextMenuMessageId } from 'entities/Message/model/selectors/getContextMenuState';
import { addFavorite } from 'entities/Message/model/services/addFavorite';
import { deleteMessage } from 'entities/Message/model/services/deleteMessage';
import { notificationActions } from 'entities/Notifications/model/slices/notifications';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useMessageContextMenu } from 'shared/hooks/useMessageContextMenu/useMessageContextMenu';

import { DeleteMessageModal } from '../../DeleteMessage';
import { MessageContextMenu } from '../../MessageContextMenu';

export const MessageManagement = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [id, setId] = useState<number | undefined>();
  const { isContextMenuOpened, handleCloseContextMenu, position } =
    useMessageContextMenu();
  const dispatch = useAppDispatch();
  const messageId = useSelector(getContextMenuMessageId);
  const handleDeleteMessage = () => {
    setIsModalShown(!isModalShown);
    setId(messageId);
    handleCloseContextMenu();
  };

  const onDelete = async (isChecked?: boolean) => {
    if (id) {
      try {
        const response = await dispatch(
          deleteMessage({ messageId: id, forAll: isChecked })
        ).unwrap();
        dispatch(
          notificationActions.setNotification({ message: response.message })
        );
      } catch (err) {
        const e = err as SerializedError;
        dispatch(notificationActions.setNotification({ message: e.message }));
      } finally {
        setIsModalShown((isShow) => !isShow);
      }
    }
  };

  const handleAddToFavorites = async () => {
    try {
      if (messageId) {
        await dispatch(addFavorite({ messageId })).unwrap();
        dispatch(notificationActions.setNotification({ message: 'Готово!' }));
      }
    } catch (err) {
      const e = err as SerializedError;
      dispatch(notificationActions.setNotification({ message: e.message }));
    }
    handleCloseContextMenu();
  };

  const contextMenuOptions = {
    'Добавить в избранное': handleAddToFavorites,
    'Удалить ': handleDeleteMessage,
  };

  return (
    <>
      <MessageContextMenu
        isOpen={isContextMenuOpened}
        options={contextMenuOptions}
        onClose={handleCloseContextMenu}
        position={position}
      />

      <DeleteMessageModal
        isOpened={isModalShown}
        onClose={() => setIsModalShown(!isModalShown)}
        onCancel={() => setIsModalShown(!isModalShown)}
        onConfirm={(isChecked) => onDelete(isChecked)}
      />
    </>
  );
};
