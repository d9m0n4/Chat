import clsx from 'classnames';
import { getMessagesState } from 'entities/Message';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { MessagesListLoading } from 'shared/ui/MessagesListLoading/MessagesListLoading';

import cls from '../Messages.module.scss';
import { MessagesGroup } from '../MessagesGroup/MessagesGroup';

interface IMessagesList {
  messages: GroupedMessages | undefined;
  userId?: number;
  getHistory?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  isLoading?: boolean;
}

export const MessagesList: FC<IMessagesList> = ({
  messages,
  userId,
  getHistory,
  containerRef,
  onScroll,
  isLoading,
}) => {
  if (!messages || Object.keys(messages).length < 0) {
    return (
      <>
        <p>У Вас еще нет сообщений</p>
      </>
    );
  }

  const triggerElementRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({
    trigger: triggerElementRef,
    root: containerRef,
    callback: getHistory,
  });

  return (
    <div
      className={clsx(cls.messages, isLoading && cls['scroll--hidden'])}
      ref={containerRef}
      onScroll={onScroll}
    >
      <div className={cls.messages__scroller}>
        {Object.keys(messages).map((date) => (
          <MessagesGroup
            key={date}
            date={date}
            messages={messages[date]}
            userId={userId}
          />
        ))}
        <div ref={triggerElementRef}></div>
      </div>
    </div>
  );
};
