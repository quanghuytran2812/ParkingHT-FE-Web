import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, paths, itemElements }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userRole = useSelector((state) => state.user.role);
    const location = useLocation();

    // Check if the user is authenticated
    if (!isAuthenticated && userRole !== allowedRoles) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return (
        <Routes>
            <Route 
                path={paths} 
                element={itemElements} />
        </Routes>
    );
};

export default ProtectedRoute;