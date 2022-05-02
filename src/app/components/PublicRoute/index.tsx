import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export default function PublicRoute({
  children,
  path,
  ...restOfProps
}: RouteProps) {
  return (
    <Route {...restOfProps} path={path}>
      {localStorage.getItem('access_token') ? <Redirect to={`/`} /> : children}
    </Route>
  );
}
