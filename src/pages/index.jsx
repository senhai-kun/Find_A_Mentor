import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/appbar";
import LandingPage from "./LandingPage";
import LoginContainer from "./LoginPage";
import MentorProfile from "./MentorProfile";
import SearchPage from "./SearchPage";
import UserProfile from "./UserProfile";
import RequireAuth from "../utils/RequireAuth";
import Settings from "./Settings";
import Protected from "../utils/Protected";
const Pages = () => {
    const { pathname } = useLocation();

    return (
        <React.Fragment>
            {pathname !== "/account/login" &&
                pathname !== "/account/register" && <Header />}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route
                    path="/mentor/profile/:name"
                    element={
                        // <RequireAuth>
                        <MentorProfile />
                        // </RequireAuth>
                    }
                />
                <Route
                    path="/account/profile/:name"
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

                <Route path="*" element={<NotFound />} />
            </Routes>
        </React.Fragment>
    );
};

const NotFound = () => {
    return (
        <div>
            <h1 style={{ marginTop: "20%" }}>Content not found</h1>
        </div>
    );
};

export default Pages;
