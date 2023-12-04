import { getActiveDialog } from 'entities/Dialog';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import { Message } from 'entities/Message/ui/Message';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'shared/config/api/api';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { useTypingIndicator } from 'shared/hooks/useTypingIndicator/useTypingIndicator';
import { TypingMessage } from 'shared/ui/TypingMessage';

import cls from '../Messages.module.scss';

export const MessagesList = ({ messages }: { messages: GroupedMessages }) => {
  const { socket } = useSocket();
  const user = useSelector(getUserData);
  const dialog = useSelector(getActiveDialog);
  const isTyping = useTypingIndicator(dialog?.id, socket);
  const messagesContainer = useRef<HTMLDivElement>(null);

  const dateRef = (element: HTMLElement | null) => {
    element?.addEventListener('click', () => {
      console.log(element?.id);
    });
    return element;
  };

  useEffect(() => {
    if (messagesContainer) {
      messagesContainer?.current?.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messagesContainer, messages]);

  const click = async (id: number) => {
    await api.post('/messages/favorites', { message: id });
  };

  return (
    <div className={cls.messages} ref={messagesContainer}>
      {Object.keys(messages).map((date) => (
        <div className={cls.messages__group} key={date} ref={dateRef}>
          <div className={cls.messages__group_date}>{new Date(date).toLocaleDateString()}</div>
          {messages[date].map((message) => (
            <Message
              onClick={() => click(message.id)}
              dataAttr={message.id}
              key={message.id}
              content={message.content}
              user={message.user}
              isSelf={message.user.id === user?.id}
              files={message.files}
              isRead={message.isRead}
            />
          ))}
        </div>
      ))}
      {isTyping && (
        <div className={cls.typing__message_wrapper}>
          <TypingMessage user={dialog?.partner} />
        </div>
      )}
    </div>
  );
};
