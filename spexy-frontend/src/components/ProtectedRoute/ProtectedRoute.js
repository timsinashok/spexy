import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    // If authenticated, render the protected children, else redirect to login
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;