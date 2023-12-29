import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { forwardRef, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';

import cls from '../Messages.module.scss';
import { MessagesListRow } from '../MessagesListRow/MessagesListRow';

interface IMessagesList {
  messages: GroupedMessages | undefined;
  userId?: number;
}

export const MessagesList = forwardRef(
  ({ messages, userId }: IMessagesList, ref: React.Ref<HTMLDivElement>) => {
    if (!messages) {
      return null;
    }

    const listRef = useRef<any>();
    const rowHeights = useRef<any>({});

    function getRowHeight(index: number) {
      return rowHeights.current[index] + 8 || 82;
    }
    function setRowHeight(index: number, size: number) {
      listRef?.current?.resetAfterIndex(0);
      rowHeights.current = { ...rowHeights.current, [index]: size };
    }

    return (
      <div className={cls.messages}>
        <AutoSizer>
          {({ width, height }: { width: number; height: number }) => (
            <List
              outerRef={ref}
              className={cls.messages__list}
              ref={listRef}
              itemSize={getRowHeight}
              height={height}
              itemCount={Object.keys(messages).length}
              width={width}
            >
              {(props) => (
                <MessagesListRow
                  messages={messages}
                  index={props.index}
                  style={props.style}
                  userId={userId}
                  setRowHeight={setRowHeight}
                />
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    );
  }
);

MessagesList.displayName = 'MessagesList';
