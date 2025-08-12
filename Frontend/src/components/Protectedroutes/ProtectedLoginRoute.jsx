// src/components/Protectedroutes/ProtectedLoginRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLoginRoute() {
  const token = localStorage.getItem("tokens");

  return token ? <Outlet /> : <Navigate to="/" replace />;
}
