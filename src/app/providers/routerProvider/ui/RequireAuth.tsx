import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { getIsAuthState } from 'features/Auth';

export const RequireAuth = () => {
  const location = useLocation();
  const isAuth = useSelector(getIsAuthState);

  if (!isAuth) {
    return <Navigate to="login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
