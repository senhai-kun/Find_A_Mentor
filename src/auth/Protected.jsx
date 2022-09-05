import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../redux/slicer/authSlice";

const Protected = ({ children }) => {
    const { loggedIn, isLoading } = useSelector(auth);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            !localStorage.getItem("fam-id") &&
            !document.cookie.includes("fam-ses")
        ) {
            navigate("/", { replace: true, state: pathname });
        }
    }, [navigate, pathname]);

    return null;

    // if (isLoading) return null;

    // return !loggedIn ? (
    //     children
    // ) : (
    //     <Navigate to="/" state={{ pathname }} replace />
    // );
};

export default Protected;
