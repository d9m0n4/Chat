import { Message } from 'entities/Message';
import { messageContextMenuActions } from 'entities/Message/model/slices/messageContextMenuSlice';
import { IMessage } from 'entities/Message/model/types/Message';
import React, { FC } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

import cls from './MessagesGroup.module.scss';

interface MessagesGroupProps {
  date: string;
  messages: IMessage[];
  userId?: number | undefined;
  style?: React.CSSProperties;
}

export const MessagesGroup: FC<MessagesGroupProps> = ({ date, messages, userId, style }) => {
  const dispatch = useAppDispatch();
  const handleOpenContextMenu = ({
    event,
    messageId,
  }: {
    event: React.MouseEvent<HTMLDivElement>;
    messageId: number;
  }) => {
    event.preventDefault();
    dispatch(
      messageContextMenuActions.toggleOpenMenu({
        messageId,
        isOpen: true,
        position: { x: event.pageX, y: event.pageY },
      })
    );
  };
  return (
    <>
      <div className={cls.messages__group} key={date} style={style}>
        <div className={cls.messages__group_date}>{new Date(date).toLocaleDateString()}</div>
        {messages.map((message) => (
          <Message
            onContextMenu={(event) => handleOpenContextMenu({ event, messageId: message.id })}
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
