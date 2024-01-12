import clsx from 'classnames';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { FC, useEffect, useRef } from 'react';
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
  if (!messages || Object.keys(messages).length < 1) {
    return (
      <div className={cls.empty}>
        <p className={cls.empty__text}>
          У Вас еще нет сообщений, начните диалог
        </p>
      </div>
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
