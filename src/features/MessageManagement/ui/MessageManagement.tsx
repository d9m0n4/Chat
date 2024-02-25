import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { getContextMenuMessageId } from 'entities/Message/model/selectors/getContextMenuState';
import { deleteMessage } from 'entities/Message/model/services/deleteMessage';
import { notificationActions } from 'entities/Notifications/model/slices/notifications';
import { api } from 'shared/config/api/api';
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
        const response = await api.post('/messages/favorites', {
          message: messageId,
        });
        if (response.data.status === 400) {
          dispatch(
            notificationActions.setNotification({
              message: response.data.message,
            })
          );
        }
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        dispatch(
          notificationActions.setNotification({
            message: e.response?.data.message,
          })
        );
      } else {
        console.error(e);
      }
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
