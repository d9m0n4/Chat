import { Message } from 'entities/Message';
import { IMessage } from 'entities/Message/model/types/Message';
import { MessageContextMenu } from 'features/MessageContextMenu';
import React, { FC, useState } from 'react';

import cls from './MessagesGroup.module.scss';

interface MessagesGroupProps {
  date: string;
  messages: IMessage[];
  userId?: number | undefined;
  context: any;
  style?: React.CSSProperties;
}

export const MessagesGroup: FC<MessagesGroupProps> = ({ date, messages, userId, context, style }) => {
  return (
    <>
      <div className={cls.messages__group} key={date} style={style}>
        <div className={cls.messages__group_date}>{new Date(date).toLocaleDateString()}</div>
        {messages.map((message) => (
          <Message
            onContextMenu={context}
            dataAttr={message.id}
            key={message.id}
            content={message.content}
            user={message.user}
            isSelf={message.user.id === userId}
            files={message.files}
            isRead={message.isRead}
          />
        ))}
      </div>
    </>
  );
};
