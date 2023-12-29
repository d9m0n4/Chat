import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { FC, memo, useEffect, useRef } from 'react';

import cls from '../Messages.module.scss';
import { MessagesGroup } from '../MessagesGroup/MessagesGroup';

interface IMessagesListRowProps {
  index: number;
  style: React.CSSProperties;
  messages: GroupedMessages;
  setRowHeight: (index: number, height: number) => void;
  userId?: number;
}
// eslint-disable-next-line react/display-name
export const MessagesListRow: FC<IMessagesListRowProps> = memo(
  ({ index, style, messages, setRowHeight, userId }) => {
    const date = Object.keys(messages)[index];
    const group = messages[date];
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [rowRef]);

    return (
      <>
        <div style={style}>
          <div ref={rowRef} className={cls.group__row}>
            <MessagesGroup date={date} messages={group} userId={userId} />
          </div>
        </div>
      </>
    );
  }
);
