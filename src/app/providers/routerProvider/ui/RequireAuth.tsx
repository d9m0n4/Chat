import { getUserData } from 'entities/User/model/selectors/getUserData';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {
  const user = localStorage.getItem('jwt');
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
