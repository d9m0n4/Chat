import { getUserData } from 'entities/User/model/selectors/getUserData';
import { AuthPage } from 'pages/AuthPage';
import { FavoritesPage } from 'pages/FavoritesPage';
import { MainPage } from 'pages/MainPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SettingsPage } from 'pages/SettingsPage';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'widgets/Layout/Layout';

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
        <Route path="/" element={<MainPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
    </Routes>
  );
};
