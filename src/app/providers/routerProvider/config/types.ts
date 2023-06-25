import {RouteProps} from "react-router-dom";

export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  FAVORITES = 'favorites',
  SETTINGS = 'settings',
  AUTH = 'auth',
  NOT_FOUND = 'not_found',
}
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}