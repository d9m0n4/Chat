import { getActiveDialog } from 'entities/Dialog';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { messagesActions } from 'entities/Message/model/slices/messageSlice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { socket } from 'shared/config/api/ws';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { MessageInput } from 'widgets/MessageInput';

import cls from './Messages.module.scss';
import { MessagesList } from './MessagesList/MessagesList';

export const Messages = () => {
  const messages = useSelector(getMessages);
  const activeDialogId = useSelector(getActiveDialog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeDialogId) {
      dispatch(fetchMessages(activeDialogId.id));
    }
  }, [activeDialogId]);

  useEffect(() => {
    socket.on('message_created', (message: any) => {
      dispatch(messagesActions.addNewMessage(message));
    });
    return () => {
      socket.off('message_created');
    };
  }, []);

  return (
    <div className={cls.messages__wrapper}>
      {messages && (
        <>
          <MessagesList messages={messages} />
          <MessageInput />
        </>
      )}
    </div>
  );
};
