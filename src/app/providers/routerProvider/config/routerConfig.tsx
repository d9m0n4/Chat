import { AppRoutes } from './types'
import { FavoritesPage } from 'pages/FavoritesPage/ui/FavoritesPage'
import { MainPage } from 'pages/MainPage/ui/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { SettingsPage } from 'pages/SettingsPage/ui/SettingsPage'
import { RouteProps } from 'react-router-dom'

export const AppRoutesPaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.FAVORITES]: '/favorites',
  [AppRoutes.SETTINGS]: '/settings',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.SIGNUP]: '/signUp',
  [AppRoutes.SIGNIN]: '/signIn',
  [AppRoutes.NOT_FOUND]: '*',
}

export const routerConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: AppRoutesPaths.main,
    element: <MainPage />,
  },
  [AppRoutes.FAVORITES]: {
    path: AppRoutesPaths.favorites,
    element: <FavoritesPage />,
  },
  [AppRoutes.SETTINGS]: {
    path: AppRoutesPaths.settings,
    element: <SettingsPage />,
  },
  [AppRoutes.PROFILE]: {
    path: AppRoutesPaths.profile,
    element: <ProfilePage />,
  },
  [AppRoutes.SIGNUP]: {
    path: AppRoutesPaths.signUp,
    element: <ProfilePage />,
  },
  [AppRoutes.SIGNIN]: {
    path: AppRoutesPaths.signIn,
    element: <ProfilePage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: AppRoutesPaths.not_found,
    element: <NotFoundPage />,
  },
}
