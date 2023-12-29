import { getActiveDialog } from 'entities/Dialog';
import { getMessagesState } from 'entities/Message';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { updateMessagesStatus } from 'entities/Message/model/services/updateMessagesStatus';
import { getUserData } from 'entities/User';
import { MessageManagement } from 'features/MessageManagement';
import React, { Suspense, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/ui/Loader';
import { Skeleton } from 'shared/ui/Skeleton';
import { MessageInput } from 'widgets/MessageInput';

import cls from './Messages.module.scss';
import { MessagesList } from './MessagesList/MessagesList';

export const Messages = () => {
  const user = useSelector(getUserData);
  const messages = useSelector(getMessages);
  const { loading } = useSelector(getMessagesState);
  const activeDialog = useSelector(getActiveDialog);
  const dispatch = useAppDispatch();
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
      <div ref={messagesWrapper} className={cls.messages__wrapper}>
        {loading && (
          <div>
            <Skeleton width={344} height={200} borderRadius={16} />
            <Skeleton width={286} height={56} borderRadius={16} />
            <Skeleton width={160} height={64} borderRadius={16} />
            <Skeleton width={268} height={78} borderRadius={16} />
            <Skeleton width={344} height={200} borderRadius={16} />
            <Skeleton width={260} height={76} borderRadius={16} />
          </div>
        )}
        {messages && (
          <Suspense fallback={<Loader />}>
            <MessagesList
              ref={messagesContainer}
              messages={messages}
              userId={user?.id}
            />
            <MessageInput />
          </Suspense>
        )}
      </div>
      <MessageManagement />
    </>
  );
};
