import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ChatHeader } from 'widgets/ChatHeader';

import { getDialogs } from '../../entities/Dialog/model/selectors/getDialogs';
import { dialogActions } from '../../entities/Dialog/model/slices/dialogSlice';
import { fetchUserData } from '../../entities/User/model/services/fetchUserData';
import { api } from '../../shared/config/api/api';
import { socket } from '../../shared/config/api/ws';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch/useAppDispatch';
import { Sidebar } from '../Sidebar';

interface MainLayoutProps {
  path?: string | undefined;
}

export const Layout: FC<MainLayoutProps> = ({ path }) => {
  const dispatch = useAppDispatch();
  const myDialogs = useSelector(getDialogs);

  useEffect(() => {
    socket.on('refreshToken', async () => {
      await api.get('/auth/refresh');
    });
    return () => {
      socket.off('refreshToken');
    };
  }, []);

  useEffect(() => {
    socket.emit(
      'user_online',
      myDialogs?.map((dialog) => dialog.partner.id)
    );
    return () => {
      socket.off('user_online');
    };
  }, [myDialogs]);

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
