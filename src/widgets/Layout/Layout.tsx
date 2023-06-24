import { AppRoutesPaths } from 'app/providers/routerProvider/config/routerConfig'
import { AppRoutes } from 'app/providers/routerProvider/config/types'
import React, { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { ChatHeader } from 'widgets/ChatHeader'
import { PageHeader } from 'widgets/PageHeader'

interface MainLayoutProps {
  path: string | undefined
}

export const Layout: FC<MainLayoutProps> = ({ path }) => {
  return (
    <div>
      {path === AppRoutesPaths.main ? <ChatHeader /> : <PageHeader children={'123123'} />}
      <Outlet />
    </div>
  )
}
