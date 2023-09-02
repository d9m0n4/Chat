import { getActiveDialog } from 'entities/Dialog';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import { Message } from 'entities/Message/ui/Message';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { useTypingIndicator } from 'shared/hooks/useTypingIndicator/useTypingIndicator';
import { TypingMessage } from 'shared/ui/TypingMessage';

import cls from '../Messages.module.scss';

export const MessagesList = ({ messages }: { messages: GroupedMessages }) => {
  const { socket, isConnected } = useSocket();
  const user = useSelector(getUserData);
  const dialog = useSelector(getActiveDialog);
  const isTyping = useTypingIndicator(dialog?.id, socket);
  const messagesContainer = useRef<HTMLDivElement>(null);

  console.log(isConnected);

  useEffect(() => {
    if (messagesContainer) {
      messagesContainer?.current?.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messagesContainer, messages]);

  return (
    <div className={cls.messages} ref={messagesContainer}>
      {Object.keys(messages).map((date) => (
        <div className={cls.messages__group} key={date}>
          <div
            className={cls.messages__group_date}
            onClick={() => console.log(123)}
          >
            {new Date(date).toLocaleDateString()}
          </div>
          {messages[date].map((message) => (
            <Message
              dataAttr={message.id}
              key={message.id}
              content={message.content}
              user={message.user}
              isSelf={message.user.id === user?.id}
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
