import {AppRoutes} from "./types";
import {RouteProps} from "react-router-dom";
import {MainPage} from "../../../pages/mainPage/mainPage";

export const AppRoutesPaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.FAVORITES]: '/favorites',
    [AppRoutes.SETTINGS]: '/settings',
}

export const routerConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: AppRoutesPaths.main,
        element: <MainPage />
    },
    [AppRoutes.FAVORITES]: {
        path: AppRoutesPaths.main,
        element: <MainPage />
    },
    [AppRoutes.SETTINGS]: {
        path: AppRoutesPaths.main,
        element: <MainPage />
    }
}