import clsx from 'classnames';
import { getActiveDialog } from 'entities/Dialog';
import { getMessagesState } from 'entities/Message';
import { getMessagesHistory } from 'entities/Message/model/services/getMessagesHistory';
import { messagesActions } from 'entities/Message/model/slices/messageSlice';
import { GroupedMessages } from 'entities/Message/model/types/Message';
import _debounce from 'lodash/debounce';
import React, { forwardRef, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { ScrollButton } from 'shared/ui/ScrollButton';

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

    const dispatch = useAppDispatch();
    const activeDialog = useSelector(getActiveDialog);
    const { totalPages, loading, page } = useSelector(getMessagesState);

    const next = () => {
      if (!loading && totalPages && page < totalPages) {
        dispatch(getMessagesHistory({ dialogId: activeDialog?.id, page }));
        dispatch(messagesActions.setPage(page + 1));
      }
    };

    const nextDebounced = _debounce(next, 500);

    useInfiniteScroll({
      trigger: triggerElementRef,
      root: containerElementRef,
      callback: nextDebounced,
    });

    // useEffect(() => {
    //   if (containerElementRef.current) {
    //     containerElementRef.current.scrollTo({
    //       top: containerElementRef.current.scrollHeight,
    //       behavior: 'smooth',
    //     });
    //   }
    // }, [messages]);

    return (
      <>
        <div className={clsx(cls.messages)} ref={containerElementRef}>
          <ScrollButton onClick={() => console.log(12321)} />
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
  }
);

MessagesList.displayName = 'MessagesList';
