import { getActiveDialog } from 'entities/Dialog';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
      dispatch(fetchMessages(activeDialogId));
    }
  }, [activeDialogId]);

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
