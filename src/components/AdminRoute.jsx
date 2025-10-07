// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// Wraps admin pages and allows only admins to access
export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // If not logged in, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, redirect to home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin is authenticated, render the page
  return children;
}
