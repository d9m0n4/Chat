import {AppRoutes, AppRoutesProps} from './types'
import { FavoritesPage } from 'pages/FavoritesPage/ui/FavoritesPage'
import { MainPage } from 'pages/MainPage/ui/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { SettingsPage } from 'pages/SettingsPage/ui/SettingsPage'
import { RouteProps } from 'react-router-dom'
import {AuthPage} from "../../../../pages/AuthPage";

export const AppRoutesPaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.FAVORITES]: '/favorites',
  [AppRoutes.SETTINGS]: '/settings',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.NOT_FOUND]: '*',
}

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: AppRoutesPaths.main,
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.FAVORITES]: {
    path: AppRoutesPaths.favorites,
    element: <FavoritesPage />,
    authOnly: true,
  },
  [AppRoutes.SETTINGS]: {
    path: AppRoutesPaths.settings,
    element: <SettingsPage />,
    authOnly: true,
  },
  [AppRoutes.PROFILE]: {
    path: AppRoutesPaths.profile,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.AUTH]: {
    path: AppRoutesPaths.auth,
    element: <AuthPage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: AppRoutesPaths.not_found,
    element: <NotFoundPage />,
  },
}
