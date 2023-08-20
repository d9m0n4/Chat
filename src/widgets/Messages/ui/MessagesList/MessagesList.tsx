import { getActiveDialog } from 'entities/Dialog';
import { IMessage } from 'entities/Message/model/types/Message';
import { Message } from 'entities/Message/ui/Message';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from 'shared/config/api/ws';
import { useTypingIndicator } from 'shared/hooks/useTypingIndicator/useTypingIndicator';

import cls from '../Messages.module.scss';

// interface MessagesListProps {
//     message: IMessage
// }

export const MessagesList = ({ messages }: { messages: IMessage[] }) => {
  const user = useSelector(getUserData);
  const dialog = useSelector(getActiveDialog);
  const isTyping = useTypingIndicator(dialog?.id);
  return (
    <div className={cls.messages}>
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          isSelf={message.user.id === user?.id}
        />
      ))}
      {isTyping && 'Набирает сообщение...'}
    </div>
  );
};
