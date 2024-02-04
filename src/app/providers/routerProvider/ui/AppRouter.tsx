import { AuthPage } from 'pages/AuthPage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SettingsPage } from 'pages/SettingsPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from 'widgets/Auth/ui/Login';
import { Register } from 'widgets/Auth/ui/Register';
import { Layout } from 'widgets/Layout/Layout';
import { Messages } from 'widgets/Messages';

import { SocketProvider } from '../../socketProvider';
import { RequireAuth } from './RequireAuth';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={'*'} element={<Navigate to={'login'} />} />
      <Route element={<AuthPage />}>
        <Route index path={'login'} element={<Login />} />
        <Route path={'register'} element={<Register />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route
          element={
            <SocketProvider>
              <Layout />
            </SocketProvider>
          }
        >
          <Route path={'*'} element={<Navigate to={'/'} />} />
          <Route path={'/'} element={<Navigate to={'dialogs'} />} />
          <Route path={'dialogs'} element={<MainPage />}>
            <Route path={':id'} element={<Messages />} />
          </Route>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        {/*возможно тут следует сделать отдельный Layout*/}
      </Route>
    </Routes>
  );
};
