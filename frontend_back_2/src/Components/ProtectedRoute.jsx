import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => {
  const token = localStorage.getItem('token');
  const isAdminUser = localStorage.getItem('isAdmin') === 'true';

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          isAdmin && !isAdminUser ? (
            <Navigate to="/home" replace />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;