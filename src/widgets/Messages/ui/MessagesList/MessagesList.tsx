import { GroupedMessages } from 'entities/Message/model/types/Message';
import { IUser } from 'entities/User/model/types/user';
import React, { forwardRef, useEffect, useRef } from 'react';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { TypingMessage } from 'shared/ui/TypingMessage';

import cls from '../Messages.module.scss';
import { MessagesGroup } from '../MessagesGroup/MessagesGroup';

interface IMessagesList {
  messages: GroupedMessages | undefined;
  isTyping?: boolean;
  userId?: number;
  dialogPartner?: IUser;
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

export const MessagesList = forwardRef(
  ({ messages, isTyping, userId, dialogPartner }: IMessagesList, ref: React.LegacyRef<HTMLDivElement>) => {
    if (!messages) {
      return null;
    }
    const listRef = useRef<any>({});
    const rowHeights = useRef<any>({});

    function getRowHeight(index: number) {
      return rowHeights.current[index] + 8 || 82;
    }
    function setRowHeight(index: number, size: number) {
      listRef.current.resetAfterIndex(0);
      rowHeights.current = { ...rowHeights.current, [index]: size };
    }
    const Row: React.FC<RowProps> = ({ index, style }) => {
      const date = Object.keys(messages)[index];
      const group = messages[date];
      const rowRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (rowRef.current) {
          setRowHeight(index, rowRef.current.clientHeight);
        }
      }, [rowRef]);

      return (
        <div style={style}>
          <div ref={rowRef} style={{ padding: '1em 2em' }}>
            <MessagesGroup date={date} messages={group} userId={userId} />
            {isTyping && dialogPartner && <TypingMessage user={dialogPartner} />}
          </div>
        </div>
      );
    };
    return (
      <InfiniteLoader
        itemCount={Object.keys(messages).length}
        isItemLoaded={(index) => false}
        loadMoreItems={(startIndex, stopIndex) => console.log(startIndex, stopIndex)}
      >
        {({ ref, onItemsRendered }) => (
          <List
            onItemsRendered={onItemsRendered}
            className={cls.messages}
            width={1}
            height={1}
            itemSize={getRowHeight}
            itemCount={Object.keys(messages).length}
            ref={listRef}
            outerRef={ref}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    );
  }
);

MessagesList.displayName = 'MessagesList';
