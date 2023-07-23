import { userActions } from 'entities/User/model/slices/userSlice';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Bookmark } from 'shared/assets/icons/bookmark.svg';
import { ReactComponent as Chat } from 'shared/assets/icons/chat.svg';
import { ReactComponent as Settings } from 'shared/assets/icons/cog.svg';
import { ReactComponent as Logout } from 'shared/assets/icons/logout.svg';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';

import cls from './Sidebar.module.scss';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userActions.logout());
  };
  return (
    <div className={cls.sidebar}>
      <div className={cls.user}>
        <NavLink to={'/profile'}>
          <Avatar />
        </NavLink>
      </div>
      <div className={cls.sidebar__nav}>
        <div className={cls.links}>
          <NavLink to={'/'} className={({ isActive }) => (isActive ? `${cls.active}` : '')}>
            <Chat className={`${cls.icon} icon`} />
          </NavLink>
          <NavLink
            to={'/favorites'}
            className={({ isActive }) => (isActive ? `${cls.active}` : '')}
          >
            <Bookmark className={`${cls.icon} icon`} />
          </NavLink>
          <NavLink to={'/settings'} className={({ isActive }) => (isActive ? `${cls.active}` : '')}>
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
