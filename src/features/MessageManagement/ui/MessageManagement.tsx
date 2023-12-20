import { getContextMenuState } from 'entities/Message/model/selectors/getContextMenuState';
import { getMessagesState } from 'entities/Message/model/selectors/getMessagesState';
import { deleteMessage } from 'entities/Message/model/services/deleteMessage';
import { notificationActions } from 'entities/Notifications/model/slices/notifications';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'shared/config/api/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useMessageContextMenu } from 'shared/hooks/useMessageContextMenu/useMessageContextMenu';

import { DeleteMessageModal } from '../../DeleteMessage/ui/DeleteMessageModal';
import { MessageContextMenu } from '../../MessageContextMenu';

export const MessageManagement = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [id, setId] = useState<number | undefined>();
  const { isContextMenuOpened, handleCloseContextMenu, position } = useMessageContextMenu();
  const dispatch = useAppDispatch();
  const { messageId } = useSelector(getContextMenuState);
  const handleDeleteMessage = () => {
    setIsModalShown(!isModalShown);
    setId(messageId);
    handleCloseContextMenu();
  };

  const onDelete = async (isChecked?: boolean) => {
    if (id) {
      try {
        const response = await dispatch(deleteMessage({ messageId: id, forAll: isChecked })).unwrap();
        console.log(response);
        dispatch(notificationActions.setNotification({ message: response.message }));
      } catch (e: any) {
        dispatch(notificationActions.setNotification({ message: e.message }));
      } finally {
        setIsModalShown((isShow) => !isShow);
      }
    }
  };

  const handleAddToFavorites = async () => {
    try {
      if (messageId) {
        await api.post('/messages/favorites', { message: messageId });
        dispatch(notificationActions.setNotification({ message: 'Готово!' }));
      }
    } catch (e) {
      console.log(e);
    }
    handleCloseContextMenu();
  };

  const contextMenuOptions = {
    Удалить: handleDeleteMessage,
    'Добавить в избранное': handleAddToFavorites,
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
