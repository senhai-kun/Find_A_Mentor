import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/appbar";
import LandingPage from "./LandingPage";
import LoginContainer from "./LoginContainer";
import MentorProfile from "./MentorProfile";
import SearchPage from "./SearchPage";
import UserProfile from "./UserProfile";
import Settings from "./Settings";
import GettingStarted from "./GettingStarted";
import RequireAuth from "../auth/RequireAuth";
import Protected from "../auth/Protected";
import NotFound from "./NotFound";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { userData } from "../redux/slicer/userSlice";
import { isLoading, isLoggedIn } from "../redux/slicer/authSlice";
import ResetPassword from "./ResetPassword";

const Pages = () => {
    const user = useSelector(userData);
    const loggedIn = useSelector(isLoggedIn);
    const loading = useSelector(isLoading);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect( () => {
        if( !loading ) {
            if( loggedIn && user ) {
                if ( user?.ismentor ) {
                    if(user?.details?.skills?.length === 0 ) {
                        navigate("/getting_started", { replace: true });
                    }
                }
            }
        }
    }, [user, loading, loggedIn, navigate]);

    return (
        <React.Fragment>
            {pathname !== "/account/login" &&
                pathname !== "/account/register" && pathname !== "/account/reset" && pathname !== "/getting_started" && <Header />}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route
                    path="/mentor/profile/:ref_id/:name"
                    element={<MentorProfile />}
                />
                <Route path="/getting_started" element={<GettingStarted />} />
                <Route
                    path="/account/profile/:ref_id"
                    element={
                        <RequireAuth>
                            <UserProfile />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/account/settings"
                    element={
                        <RequireAuth>
                            <Settings />
                        </RequireAuth>
                    }
                />
                <Route path="/account/login" element={<LoginContainer />} />
                <Route path="/account/register" element={<LoginContainer />} />
                <Route path="/chat/:user" element={<Chat />} />
                <Route path="/account/reset" element={<ResetPassword />} />
                
                <Route path="*" element={<NotFound />} />
            </Routes>
        </React.Fragment>
    );
};


export default Pages;
