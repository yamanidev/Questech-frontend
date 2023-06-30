import React from "react";
import { Navigate } from "react-router-dom";
import authService from "~/services/auth/auth-service";

function RequireAuth({ children }) {
  if (!authService.isAuthn()) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
