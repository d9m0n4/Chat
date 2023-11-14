import { getUserData } from 'entities/User';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {
  // const user = localStorage.getItem('jwt');
  const location = useLocation();
  const user = useSelector(getUserData);

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
