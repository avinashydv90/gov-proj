import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children: JSX.Element;
};

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken: { exp: number } = jwtDecode(token);

  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" replace />;
  }

  const userRole = localStorage.getItem("role");

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
