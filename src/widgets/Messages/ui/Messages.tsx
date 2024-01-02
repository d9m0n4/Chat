import { getActiveDialog } from 'entities/Dialog';
import { getMessagesState } from 'entities/Message';
import { getMessages } from 'entities/Message/model/selectors/getMessages';
import { fetchMessages } from 'entities/Message/model/services/fetchMessages';
import { getMessagesHistory } from 'entities/Message/model/services/getMessagesHistory';
import { updateMessagesStatus } from 'entities/Message/model/services/updateMessagesStatus';
import { messagesActions } from 'entities/Message/model/slices/messageSlice';
import { getUserData } from 'entities/User';
import { MessageManagement } from 'features/MessageManagement';
import _debounce from 'lodash/debounce';
import React, {
  MouseEvent,
  Suspense,
  UIEvent,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { ScrollButton } from 'shared/ui/ScrollButton';
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

  const next = _debounce(() => {
    if (!loading && totalPages && page < totalPages) {
      dispatch(getMessagesHistory({ dialogId: activeDialog?.id, page }));
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

  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (activeDialog) {
      dispatch(fetchMessages(activeDialog?.id));
      dispatch(updateMessagesStatus(activeDialog?.id));
      dispatch(messagesActions.setPage(1));
      setIsScrollDownActive(false);
    }
  }, [activeDialog, dispatch]);

  useEffect(() => {
    const h = (event: any) => {
      setHeight(event.detail.height);
    };
    document.addEventListener('textareachangeheight', h);
    return () => {
      document.removeEventListener('textareachangeheight', h);
    };
  }, []);

  return (
    <>
      <div ref={messagesWrapper} className={cls.messages__wrapper}>
        {isScrollDownActive && (
          <ScrollButton
            onClick={scrollBottom}
            style={{ bottom: `${height}px` }}
          />
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
            <Suspense fallback={'kek'}>
              <MessageInput />
            </Suspense>
          </>
        )}
      </div>
      <MessageManagement />
    </>
  );
};
