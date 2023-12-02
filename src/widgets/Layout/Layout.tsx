import { getDialogs } from 'entities/Dialog/model/selectors/getDialogs';
import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { ChatHeader } from 'widgets/ChatHeader';

import { fetchUserData } from '../../entities/User/model/services/fetchUserData';
import { Sidebar } from '../Sidebar';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const myDialogs = useSelector(getDialogs);
  const { socket } = useSocket();

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
    socket?.on('friends_online', (ids: number[]) => ids.forEach((id) => setUserOnline(id)));
    socket?.on('online', setUserOnline);
    socket?.on('offline', setUserOffline);
    socket?.on('dis', (m) => {
      socket?.disconnect();
      console.log(m);
    });

    return () => {
      socket?.off('online', setUserOnline);
      socket?.off('offline', setUserOffline);
      socket?.off('friends_online');
      socket?.off('dis');
      socket?.off('refreshToken');
    };
  }, [socket]);

  return (
    <div className="main">
      <Sidebar />
      <div>
        <ChatHeader />
        <Outlet />
      </div>
    </div>
  );
};
