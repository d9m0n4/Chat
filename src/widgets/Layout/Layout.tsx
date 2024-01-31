import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { ChatHeader } from 'widgets/ChatHeader';

import { dialogActions } from '../../entities/Dialog/model/slices/dialogSlice';
import { messagesActions } from '../../entities/Message/model/slices/messageSlice';
import { Notifications } from '../../entities/Notifications';
import { fetchUserData } from '../../entities/User/model/services/fetchUserData';
import { Portal } from '../../shared/ui/Portal';
import { Sidebar } from '../Sidebar';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    const setUserOnline = (user: number) => {
      dispatch(dialogActions.setUserOnline({ userId: user, isOnline: true }));
    };
    const setUserOffline = (user: number) => {
      dispatch(dialogActions.setUserOnline({ userId: user, isOnline: false }));
    };
    socket?.on('friends_online', (ids: number[]) => {
      ids.forEach((id) => setUserOnline(id));
      console.log(ids);
    });
    socket?.on('set_friend_online', setUserOnline);
    socket?.on('set_friend_offline', setUserOffline);

    return () => {
      socket?.off('set_friend_online', setUserOnline);
      socket?.off('set_friend_offline', setUserOffline);
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
      <div className="main__wrapper">
        <ChatHeader />
        <Outlet />
      </div>
      <Portal>
        <Notifications />
      </Portal>
    </div>
  );
};
