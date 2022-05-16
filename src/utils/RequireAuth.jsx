import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../redux/slicer/authSlice";

const RequireAuth = ({ children }) => {
    const { loggedIn, isLoading } = useSelector(auth);
    const { pathname } = useLocation();

    if (isLoading) return null;

    return loggedIn ? (
        children
    ) : (
        <Navigate to="/account/login" state={{ pathname }} replace />
    );
};

export default RequireAuth;
