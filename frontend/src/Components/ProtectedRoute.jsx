import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAdmin = false }) => {
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/" />;
  }

  if (isAdmin && userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;