import { AppRoutesPaths } from 'app/providers/routerProvider/config/routerConfig';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ChatHeader } from 'widgets/ChatHeader';
import { PageHeader } from 'widgets/PageHeader';

import { Sidebar } from '../Sidebar';

interface MainLayoutProps {
  path?: string | undefined;
}

export const Layout: FC<MainLayoutProps> = ({ path }) => {
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
