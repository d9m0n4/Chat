import { getActiveDialog } from 'entities/Dialog';
import { getMessagesState } from 'entities/Message';
import { getMessagesHistory } from 'entities/Message/model/services/getMessagesHistory';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { Loader } from 'shared/ui/Loader';
import { Skeleton } from 'shared/ui/Skeleton';

import cls from '../Messages.module.scss';
import { MessagesGroup } from '../MessagesGroup/MessagesGroup';

interface IMessagesList {
  messages: GroupedMessages | undefined;
  userId?: number;
}

export const MessagesList = forwardRef(
  ({ messages, userId }: IMessagesList, ref: React.Ref<HTMLDivElement>) => {
    if (!messages || Object.keys(messages).length < 0) {
      return null;
    }

    const triggerElementRef = useRef<HTMLDivElement>(null);
    const containerElementRef = useRef<HTMLDivElement>(null);

    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    const activeDialog = useSelector(getActiveDialog);
    const { totalPages, loading } = useSelector(getMessagesState);

    const next = useCallback(async () => {
      await dispatch(
        getMessagesHistory({ dialogId: activeDialog?.id, page: 1 })
      );
      setPage((prevPage) => prevPage + 1);
    }, [page]);

    useInfiniteScroll({
      trigger: triggerElementRef,
      callback: () => setTimeout(() => next(), 600),
      root: containerElementRef,
    });

    console.log(loading);

    return (
      <div className={cls.messages} ref={containerElementRef}>
        <div className={cls.messages__scroller}>
          {Object.keys(messages).map((date) => (
            <MessagesGroup
              key={date}
              date={date}
              messages={messages[date]}
              userId={userId}
            />
          ))}
        </div>
        <div ref={triggerElementRef} />
        {loading && (
          <>
            <Skeleton width={360} height={56} borderRadius={16} />
            <Skeleton width={360} height={56} borderRadius={16} />
            <Skeleton width={360} height={56} borderRadius={16} />
            <Skeleton width={360} height={56} borderRadius={16} />
            <Skeleton width={360} height={56} borderRadius={16} />
          </>
        )}
      </div>
    );
  }
);

MessagesList.displayName = 'MessagesList';
