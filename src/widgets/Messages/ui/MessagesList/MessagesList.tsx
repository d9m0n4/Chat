import clsx from 'classnames';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, {
  FC,
  RefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';

import cls from '../Messages.module.scss';
import { MessagesGroup } from '../MessagesGroup/MessagesGroup';

interface IMessagesList {
  messages: GroupedMessages | undefined;
  userId?: number;
  getHistory?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}

export const MessagesList: FC<IMessagesList> = ({
  messages,
  userId,
  getHistory,
  containerRef,
  onScroll,
}) => {
  if (!messages || Object.keys(messages).length < 0) {
    return null;
  }

  const triggerElementRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({
    trigger: triggerElementRef,
    root: containerRef,
    callback: getHistory,
  });

  return (
    <>
      <div
        className={clsx(cls.messages)}
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
    </>
  );
};
