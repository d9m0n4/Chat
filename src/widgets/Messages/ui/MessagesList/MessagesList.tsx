import { getActiveDialog } from 'entities/Dialog';
import { IMessage } from 'entities/Message/model/types/Message';
import { Message } from 'entities/Message/ui/Message';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTypingIndicator } from 'shared/hooks/useTypingIndicator/useTypingIndicator';
import { TypingMessage } from 'shared/ui/TypingMessage';

import cls from '../Messages.module.scss';

// interface MessagesListProps {
//     message: IMessage
// }

export const MessagesList = ({ messages }: { messages: IMessage[] }) => {
  const user = useSelector(getUserData);
  const dialog = useSelector(getActiveDialog);
  const isTyping = useTypingIndicator(dialog?.id);
  const messagesContainer = useRef<HTMLDivElement>(null);

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
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          user={message.user}
          isSelf={message.user.id === user?.id}
        />
      ))}
      {isTyping && (
        <div className={cls.typing__message_wrapper}>
          <TypingMessage user={dialog?.partner} />
        </div>
      )}
    </div>
  );
};
