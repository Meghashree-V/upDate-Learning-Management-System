import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar role pass kiya gaya hai aur wo match nahi kar raha
  if (role && userRole !== role) {
    if (userRole === 'teacher') {
      return <Navigate to="/teacher" replace />;
    } else if (userRole === 'student') {
      return <Navigate to="/student" replace />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />; // fallback
    }
  }

  return children;
}
