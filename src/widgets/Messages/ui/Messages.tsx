import { getActiveDialog } from 'entities/Dialog';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { updateMessagesStatus } from 'entities/Message/model/services/updateMessagesStatus';
import { getUserData } from 'entities/User';
import { MessageManagement } from 'features/MessageManagement';
import React, { Suspense, useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (activeDialog) {
      dispatch(fetchMessages(activeDialog?.id));
      dispatch(updateMessagesStatus(activeDialog?.id));
    }
  }, [activeDialog, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div id={'messages'} ref={messagesWrapper} className={cls.messages__wrapper}>
        {messages && (
          <Suspense fallback={<Loader />}>
            <MessagesList
              ref={messagesContainer}
              messages={messages}
              userId={user?.id}
              isTyping={isTyping}
              dialogPartner={activeDialog?.partner}
            />
            <MessageInput />
          </Suspense>
        )}
      </div>
      <MessageManagement />
    </>
  );
};
