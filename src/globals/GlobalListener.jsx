import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkSession, logoutUser } from "../redux/slicer/authSlice";

const GlobalListener = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const persist = useCallback(() => {
        dispatch(checkSession());
    }, [dispatch]);

    useEffect(() => {
        // always check if session is available on every navigate page
        persist();
        console.count("Checks session!")
    }, [navigate, persist]);

    useEffect(() => {
        const listener = (e) => {
            console.log(e);
            if (e.key === "fam-id" && e.oldValue && !e.newValue) {
                // Logout other tabs
                dispatch(logoutUser(navigate));
            }

            if (e.key === "fam-id" && e.newValue && !e.oldValue) {
                // Refresh page to authenticate login
                navigate(0);
            }
        };

        window.addEventListener("storage", listener);

        return () => window.removeEventListener("storage", listener);
    }, [dispatch, navigate]);

    return null;
};

export default GlobalListener;
