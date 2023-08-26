import { getActiveDialog } from 'entities/Dialog';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { messagesActions } from 'entities/Message/model/slices/messageSlice';
import { IMessage } from 'entities/Message/model/types/Message';
import React, { useEffect, useRef } from 'react';
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
  const messagesWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDialogId) {
      dispatch(fetchMessages(activeDialogId.id));
    }
  }, [activeDialogId]);

  useEffect(() => {
    const observerOptions = {
      root: messagesWrapper.current,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entriy) => {
        if (entriy.isIntersecting) {
          console.log(123);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (messagesWrapper.current) {
      const messages =
        messagesWrapper.current.querySelectorAll('[data-message-id]');
      messages.forEach((message) => {
        observer.observe(message);
      });
    }
  }, []);

  return (
    <div ref={messagesWrapper} className={cls.messages__wrapper}>
      {messages && (
        <>
          <MessagesList messages={messages} />
          <MessageInput />
        </>
      )}
    </div>
  );
};
