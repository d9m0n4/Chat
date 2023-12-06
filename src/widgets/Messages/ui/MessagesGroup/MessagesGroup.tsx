import { Message } from 'entities/Message';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import { MessageContextMenu } from 'features/MessageContextMenu';
import React, { FC, useState } from 'react';

import cls from './MessagesGroup.module.scss';

interface MessagesGroupProps {
  date: string;
  messages: GroupedMessages;
  userId?: number | undefined;
}

export const MessagesGroup: FC<MessagesGroupProps> = ({ date, messages, userId }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isContextOpened, setIsContextOpened] = useState(false);
  const handleClickContext = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event);
    event.preventDefault();
    setIsContextOpened(false);
    setIsContextOpened(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };

  const handleCloseContextMenu = () => {
    setPosition({ x: 0, y: 0 });
    setIsContextOpened(false);
  };

  const handleDelete = () => {
    console.log('Удалить');
    handleCloseContextMenu();
  };

  const handleAddToFavorites = () => {
    console.log('Добавить в избранное');
    handleCloseContextMenu();
  };

  const contextMenuOptions = {
    Удалить: handleDelete,
    'Добавить в избранное': handleAddToFavorites,
  };
  return (
    <>
      <div className={cls.messages__group} key={date}>
        <div className={cls.messages__group_date}>{new Date(date).toLocaleDateString()}</div>
        {messages[date].map((message) => (
          <Message
            onContextMenu={handleClickContext}
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
      {isContextOpened && (
        <MessageContextMenu position={position} options={contextMenuOptions} onClose={handleCloseContextMenu} />
      )}
    </>
  );
};
