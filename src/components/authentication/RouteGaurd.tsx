import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface RouteGuardTypes {
  component: React.FC;
}

function RouteGuard({ component: Component, ...props }: RouteGuardTypes) {
  const user = useAuth();
  if (user) {
    return <Component {...props} />;
  }
  return <Navigate to="/" />;
}

export default RouteGuard;
