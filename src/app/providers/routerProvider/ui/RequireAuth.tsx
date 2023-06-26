import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: Props) => {
  const auth = true;
  return auth ? children : <Navigate to="/auth" />;
};
