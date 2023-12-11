import { getActiveDialog } from 'entities/Dialog';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { updateMessagesStatus } from 'entities/Message/model/services/updateMessagesStatus';
import { getUserData } from 'entities/User';
import { MessageContextMenu } from 'features/MessageContextMenu';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { useTypingIndicator } from 'shared/hooks/useTypingIndicator/useTypingIndicator';
import { Loader } from 'shared/ui/Loader';
import { MessageInput } from 'widgets/MessageInput';

import cls from './Messages.module.scss';
import { MessagesList } from './MessagesList/MessagesList';

export const Messages = () => {
  const { socket } = useSocket();
  const user = useSelector(getUserData);
  const messages = useSelector(getMessages);
  const activeDialog = useSelector(getActiveDialog);
  const dispatch = useAppDispatch();
  const isTyping = useTypingIndicator(activeDialog?.id, socket);
  const messagesWrapper = useRef<HTMLDivElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleClickContext = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event);
    event.preventDefault();
    setIsContextOpened(false);
    setIsContextOpened(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };

  const handleCloseContextMenu = () => {
    setPosition({ x: 0, y: 0 });
    setIsContextOpened(false);
  };

  const handleDelete = () => {
    console.log('Удалить');
    handleCloseContextMenu();
  };

  const handleAddToFavorites = () => {
    console.log('Добавить в избранное');
    handleCloseContextMenu();
  };

  const contextMenuOptions = {
    Удалить: handleDelete,
    'Добавить в избранное': handleAddToFavorites,
  };

  useEffect(() => {
    if (activeDialog) {
      dispatch(fetchMessages(activeDialog.id));
    }
  }, [activeDialog]);

  useEffect(() => {
    if (activeDialog) {
      dispatch(updateMessagesStatus(activeDialog?.id));
    }
  }, [activeDialog, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const memoizedMessagesList = useMemo(
    () => (
      <MessagesList
        context={handleClickContext}
        ref={messagesContainer}
        messages={messages}
        userId={user?.id}
        isTyping={isTyping}
        dialogPartner={activeDialog?.partner}
      />
    ),
    [messages, user, isTyping, activeDialog]
  );

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isContextOpened, setIsContextOpened] = useState(false);
  const root = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={messagesWrapper} className={cls.messages__wrapper}>
      {messages && (
        <Suspense fallback={<Loader />}>
          {memoizedMessagesList}
          <MessageInput />
        </Suspense>
      )}
      {isContextOpened && (
        <MessageContextMenu position={position} options={contextMenuOptions} onClose={handleCloseContextMenu} />
      )}
    </div>
  );
};
