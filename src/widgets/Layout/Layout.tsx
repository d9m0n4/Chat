import { getDialogs } from 'entities/Dialog/model/selectors/getDialogs';
import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { ChatHeader } from 'widgets/ChatHeader';

import { messagesActions } from '../../entities/Message/model/slices/messageSlice';
import { Notifications } from '../../entities/Notifications';
import { getNotifications } from '../../entities/Notifications/model/selectors/getNotifications';
import { fetchUserData } from '../../entities/User/model/services/fetchUserData';
import { Portal } from '../../shared/ui/Portal';
import { Sidebar } from '../Sidebar';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const myDialogs = useSelector(getDialogs);
  const { socket } = useSocket();
  const { notifications } = useSelector(getNotifications);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    if (myDialogs) {
      socket?.emit(
        'user_online',
        myDialogs?.map((dialog) => dialog.partner.id)
      );
    }

    return () => {
      socket?.off('user_online');
    };
  }, [myDialogs, socket]);

  useEffect(() => {
    const setUserOnline = (user: number) => {
      dispatch(dialogActions.setUserOnline({ userId: user, isOnline: true }));
    };
    const setUserOffline = (user: number) => {
      dispatch(dialogActions.setUserOnline({ userId: user, isOnline: false }));
    };
    socket?.on('friends_online', (ids: number[]) =>
      ids.forEach((id) => setUserOnline(id))
    );
    socket?.on('online', setUserOnline);
    socket?.on('offline', setUserOffline);

    return () => {
      socket?.off('online', setUserOnline);
      socket?.off('offline', setUserOffline);
      socket?.off('friends_online');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('message_deleted', (m) => {
      dispatch(messagesActions.deleteMessage({ messageId: m.messageId }));
    });
    return () => {
      socket?.off('message_deleted');
    };
  }, [socket]);

  return (
    <div className="main">
      <Sidebar />
      <div>
        <ChatHeader />
        <Outlet />
      </div>
      <Portal>
        <Notifications notifications={notifications} />
      </Portal>
    </div>
  );
};
