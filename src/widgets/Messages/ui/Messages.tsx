import { getActiveDialog } from 'entities/Dialog';
import { getContextMenuIsOpen, getMessagesState } from 'entities/Message';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { getMessagesHistory } from 'entities/Message/model/services/getMessagesHistory';
import { updateMessagesStatus } from 'entities/Message/model/services/updateMessagesStatus';
import { messagesActions } from 'entities/Message/model/slices/messageSlice';
import { getUserData } from 'entities/User';
import { MessageManagement } from 'features/MessageManagement';
import _debounce from 'lodash/debounce';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { ScrollButton } from 'shared/ui/ScrollButton';
import { Skeleton } from 'shared/ui/Skeleton';
import { MessageInput } from 'widgets/MessageInput';

import cls from './Messages.module.scss';
import { MessagesList } from './MessagesList/MessagesList';

export const Messages = () => {
  const [isScrollDownActive, setIsScrollDownActive] = useState(false);
  const user = useSelector(getUserData);
  const messages = useSelector(getMessages);
  const activeDialog = useSelector(getActiveDialog);
  const dispatch = useAppDispatch();
  const messagesWrapper = useRef<HTMLDivElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);
  const { totalPages, loading, page } = useSelector(getMessagesState);

  const messagesLength = useMemo(() => {
    if (messages) {
      return Object.values(messages).reduce(
        (acc, item) => acc + item.length,
        0
      );
    }
  }, [messages]);

  const next = _debounce(() => {
    if (!loading && totalPages && page < totalPages && messagesLength) {
      dispatch(
        getMessagesHistory({ dialogId: activeDialog?.id, skip: messagesLength })
      );
      dispatch(messagesActions.setPage(page + 1));
    }
  }, 500);

  const showScrollButton = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = Math.floor(
      (event.currentTarget.scrollTop /
        (event.currentTarget.scrollHeight - event.currentTarget.clientHeight)) *
        100
    );
    scrollPosition < -30
      ? setIsScrollDownActive(true)
      : setIsScrollDownActive(false);
  };

  const scrollBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (activeDialog) {
      dispatch(fetchMessages(activeDialog?.id));
      dispatch(updateMessagesStatus(activeDialog?.id));
      dispatch(messagesActions.setPage(1));
      setIsScrollDownActive(false);
    }
  }, [activeDialog, dispatch]);

  return (
    <>
      <div ref={messagesWrapper} className={cls.messages__wrapper}>
        {isScrollDownActive && (
          <ScrollButton onClick={scrollBottom} className={cls.scroll__btn} />
        )}
        {messages && (
          <>
            <MessagesList
              containerRef={messagesContainer}
              messages={messages}
              userId={user?.id}
              getHistory={next}
              onScroll={showScrollButton}
            />
            <Suspense
              fallback={
                <Skeleton height={84} width={'100%'} borderRadius={0} />
              }
            >
              <MessageInput />
            </Suspense>
          </>
        )}
      </div>

      <MessageManagement />
    </>
  );
};
