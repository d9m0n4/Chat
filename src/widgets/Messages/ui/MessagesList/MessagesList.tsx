import { IMessage } from 'entities/Message/model/types/Message';
import { Message } from 'entities/Message/ui/Message';
import React from 'react';

import cls from '../Messages.module.scss';

// interface MessagesListProps {
//     message: IMessage
// }

export const MessagesList = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className={cls.messages}>
      {messages.map((message) => (
        <Message key={message.id} content={message.content} />
      ))}
    </div>
  );
};
