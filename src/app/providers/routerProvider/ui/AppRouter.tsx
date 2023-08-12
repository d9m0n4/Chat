import { getUserData } from 'entities/User/model/selectors/getUserData';
import { AuthPage } from 'pages/AuthPage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SettingsPage } from 'pages/SettingsPage';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'widgets/Layout/Layout';
import { Messages } from 'widgets/Messages';

import { routerConfig } from '../config/routerConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
  const user = useSelector(getUserData);
  return (
    // <Routes>
    //   {Object.values(routerConfig).map((route) => {
    //     const element = <Suspense fallback={'loading...'}>{route.element}</Suspense>;
    //     if (route.authOnly) {
    //       return (
    //         <Route key={route.path} element={<Layout path={route.path} />}>
    //           <Route path={route.path} element={<RequireAuth>{element}</RequireAuth>} />
    //         </Route>
    //       );
    //     }
    //     return <Route key={route.path} path={route.path} element={route.element} />;
    //   })}
    // </Routes>
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        >
          <Route path={'/:id'} element={<Messages />} />
        </Route>
        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <FavoritesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
      </Route>

      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
    </Routes>
  );
};
