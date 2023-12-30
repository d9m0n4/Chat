import { getActiveDialog } from 'entities/Dialog';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List, ListOnScrollProps } from 'react-window';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';

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
    const outerRef = useRef<HTMLDivElement>();

    const listRef = useRef<any>();
    const rowHeights = useRef<any>({});

    function getRowHeight(index: number) {
      return rowHeights.current[index] + 8 || 82;
    }
    function setRowHeight(index: number, size: number) {
      listRef?.current?.resetAfterIndex(0);
      rowHeights.current = { ...rowHeights.current, [index]: size };
    }
    const activeDialog = useSelector(getActiveDialog);

    const dispatch = useAppDispatch();

    const [count, setCount] = useState(15);
    const [page, setPage] = useState(1);

    useEffect(() => {
      if (listRef.current) {
        listRef.current.scrollToItem(999);
      }
    }, [messages]);

    const loadMore = ({
      scrollDirection,
      scrollUpdateWasRequested,
      scrollOffset,
    }: ListOnScrollProps) => {
      if (scrollOffset < 1) {
        if (page < 10) {
          setCount((prev) => prev + 15);
          setPage((prevPage) => prevPage++);
          dispatch(fetchMessages({ id: activeDialog?.id, offset: 0, count }));

          console.log(page, count);
        }
        listRef.current.scrollTo(400);
        console.log(scrollUpdateWasRequested);
      }
    };

    return (
      <div className={cls.messages}>
        <AutoSizer>
          {({ width, height }: { width: number; height: number }) => (
            <List
              onScroll={loadMore}
              initialScrollOffset={500}
              outerRef={outerRef}
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
