import { getAuthData } from 'entities/User/model/selectors/getUserData';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {
  // const user = localStorage.getItem('jwt');
  const location = useLocation();
  const authData = useSelector(getAuthData);

  if (!authData.isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
