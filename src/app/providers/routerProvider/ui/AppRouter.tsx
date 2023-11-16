import { AuthPage } from 'pages/AuthPage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SettingsPage } from 'pages/SettingsPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'widgets/Layout/Layout';
import { Messages } from 'widgets/Messages';

import { SocketProvider } from '../../socketProvider';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthPage />} />
      <Route element={<RequireAuth />}>
        <Route
          element={
            <SocketProvider>
              <Layout />
            </SocketProvider>
          }
        >
          <Route path={'/'} element={<Navigate to={'dialogs'} />} />
          <Route path={'dialogs'} element={<MainPage />}>
            <Route path={':id'} element={<Messages />} />
          </Route>
        </Route>
        {/*возможно тут следует сделать отдельный Layout*/}
        <Route element={<Layout />}>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
