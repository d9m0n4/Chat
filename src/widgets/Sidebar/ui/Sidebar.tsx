import { getActiveDialog } from 'entities/Dialog';
import { dialogActions } from 'entities/Dialog/model/slices/dialogSlice';
import { getUserState } from 'entities/User/model/selectors/getUserData';
import { authActions } from 'features/Auth/model/slices/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Bookmark } from 'shared/assets/icons/bookmark.svg';
import { ReactComponent as Chat } from 'shared/assets/icons/chat.svg';
import { ReactComponent as Settings } from 'shared/assets/icons/cog.svg';
import { ReactComponent as Logout } from 'shared/assets/icons/logout.svg';
import { BASE_URL } from 'shared/config/api/api';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSocket } from 'shared/hooks/useSocket/useSocket';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';

import cls from './Sidebar.module.scss';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const { user } = useSelector(getUserState);
  const activeDialog = useSelector(getActiveDialog);

  const handleLogout = () => {
    dispatch(authActions.logout());
    socket?.disconnect();
  };

  const handleResetActiveDialog = () => {
    if (activeDialog) {
      dispatch(dialogActions.setActiveDialog(null));
    }
  };

  return (
    <div className={cls.sidebar}>
      <div className={cls.user}>
        <NavLink to={'/profile'}>
          <Avatar
            src={user?.avatar && `${BASE_URL}${user.avatar}`}
            name={user?.name}
          />
        </NavLink>
      </div>
      <div className={cls.sidebar__nav}>
        <div className={cls.links}>
          <NavLink
            to={'/dialogs'}
            onClick={handleResetActiveDialog}
            className={({ isActive }) => (isActive ? `${cls.active}` : '')}
          >
            <Chat className={`${cls.icon} icon`} />
          </NavLink>
          <NavLink
            to={'favorites'}
            className={({ isActive }) => (isActive ? `${cls.active}` : '')}
          >
            <Bookmark className={`${cls.icon} icon`} />
          </NavLink>
          <NavLink
            to={'settings'}
            className={({ isActive }) => (isActive ? `${cls.active}` : '')}
          >
            <Settings className={`${cls.icon} icon`} />
          </NavLink>
        </div>
        <div className={cls.links}>
          <Button onClick={handleLogout}>
            <Logout className={`${cls.icon} icon`} />
          </Button>
        </div>
      </div>
    </div>
  );
};
