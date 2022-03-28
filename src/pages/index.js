import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from "../components/appbar";
import LandingPage from "./LandingPage";
import LoginContainer from './Login';

const Pages = () => {
    const location = useLocation()

    return (
        <React.Fragment>
            { location.pathname !== "/account/login" &&  location.pathname !== "/account/register" && <Header />  }

            <Routes>
                <Route path='/' element={<LandingPage />} />

                <Route path='/account/:type' element={<LoginContainer />} />
            </Routes>

        </React.Fragment>
    );
}

export default Pages;
