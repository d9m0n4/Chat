import { GroupedMessages } from 'entities/Message/model/types/Message';
import { IUser } from 'entities/User/model/types/user';
import React, { FC, useEffect, useRef } from 'react';
import { TypingMessage } from 'shared/ui/TypingMessage';

import cls from '../Messages.module.scss';
import { MessagesGroup } from '../MessagesGroup/MessagesGroup';

interface IMessagesList {
  messages: GroupedMessages;
  isTyping?: boolean;
  userId?: number;
  dialogPartner?: IUser;
}

export const MessagesList: FC<IMessagesList> = ({ messages, isTyping, userId, dialogPartner }) => {
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
      {Object.keys(messages).map((date) => (
        <MessagesGroup key={date} date={date} messages={messages} userId={userId} />
      ))}
      {isTyping && (
        <div className={cls.typing__message_wrapper}>{dialogPartner && <TypingMessage user={dialogPartner} />}</div>
      )}
    </div>
  );
};
