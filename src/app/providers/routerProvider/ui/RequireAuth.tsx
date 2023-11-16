import { getUser } from 'entities/User/model/selectors/getUserData';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {
  // const user = localStorage.getItem('jwt');
  const location = useLocation();
  const user = useSelector(getUser);

  if (!user.isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
