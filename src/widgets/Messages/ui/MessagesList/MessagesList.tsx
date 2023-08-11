import { IMessage } from 'entities/Message/model/types/Message';
import { Message } from 'entities/Message/ui/Message';
import { getUserData } from 'entities/User/model/selectors/getUserData';
import React from 'react';
import { useSelector } from 'react-redux';

import cls from '../Messages.module.scss';

// interface MessagesListProps {
//     message: IMessage
// }

export const MessagesList = ({ messages }: { messages: IMessage[] }) => {
  const user = useSelector(getUserData);
  return (
    <div className={cls.messages}>
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          isSelf={message.user.id === user?.id}
        />
      ))}
    </div>
  );
};
