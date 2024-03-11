import React, { FC, useRef } from 'react';

import clsx from 'classnames';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';

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
  const triggerElementRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({
    trigger: triggerElementRef,
    root: containerRef,
    callback: getHistory,
  });

  if (!messages || Object.keys(messages).length < 1) {
    return (
      <div className={cls.empty}>
        <p className={cls.empty__text}>
          У Вас еще нет сообщений, начните диалог
        </p>
      </div>
    );
  }

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
        {messages && Object.values(messages).length > 2 && (
          <div ref={triggerElementRef}></div>
        )}
      </div>
    </div>
  );
};
