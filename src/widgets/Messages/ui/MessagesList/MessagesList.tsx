import { getActiveDialog } from 'entities/Dialog';
import {
  GroupedMessages,
  IMessage,
} from 'entities/Message/model/types/Message';
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

export const MessagesList = ({ messages }: { messages: GroupedMessages }) => {
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

  const messagesGroup = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    console.log(messagesGroup.current);
    if (messagesGroup.current) {
      messagesGroup.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }; // по клику на дату скролить в начало сообщений конкретной грууппы

  return (
    <div className={cls.messages} ref={messagesContainer}>
      {Object.keys(messages).map((date) => (
        <div className={cls.messages__group} key={date} ref={messagesGroup}>
          <div className={cls.messages__group_date} onClick={handleScrollToTop}>
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
