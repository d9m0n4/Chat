import { getUserData } from 'entities/User/model/selectors/getUserData';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: Props) => {
  const auth = useSelector(getUserData);
  const location = useLocation();

  return auth ? children : <Navigate to="/auth" state={{ from: location }} replace />;
};
