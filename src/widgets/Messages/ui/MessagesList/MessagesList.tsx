import { getActiveDialog } from 'entities/Dialog';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List, ListOnScrollProps } from 'react-window';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'shared/ui/Loader';

import cls from '../Messages.module.scss';
import { MessagesGroup } from '../MessagesGroup/MessagesGroup';
import { MessagesListRow } from '../MessagesListRow/MessagesListRow';

interface IMessagesList {
  messages: GroupedMessages | undefined;
  userId?: number;
}

export const MessagesList = forwardRef(
  ({ messages, userId }: IMessagesList, ref: React.Ref<HTMLDivElement>) => {
    if (!messages || Object.keys(messages).length < 0) {
      return null;
    }

    const dispatch = useAppDispatch();
    const activeDialog = useSelector(getActiveDialog);

    const next = () => {
      dispatch(fetchMessages({ id: activeDialog?.id, count: 30, offset: 0 }));
    };

    return (
      <div className={cls.messages} id="scrollableDiv">
        <InfiniteScroll
          pullDownToRefresh={true}
          refreshFunction={() => console.log('ref')}
          className={cls.messages__scroller}
          loader={<Loader />}
          dataLength={Object.values(messages).length}
          hasMore={true}
          inverse={true}
          scrollableTarget="scrollableDiv"
          next={next}
        >
          {Object.keys(messages).map((date) => (
            <MessagesGroup
              key={date}
              date={date}
              messages={messages[date]}
              userId={userId}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
);

MessagesList.displayName = 'MessagesList';
