import React from "react";
import Intro from "../components/Intro";
import Instruction from "../components/Instruction";
import Recommended from "../components/Recommended";
import Discover from "../components/Discover";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Header = () => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>Mentor</title>
            <link rel="canonical" href="https://find-mentor.vercel.app" />
        </Helmet>
    );
};

const LandingPage = () => {
    return (
        <React.Fragment>
            <Header />
            <Intro />

            <Instruction />

            <Recommended />

            <Discover />

            <Footer />
        </React.Fragment>
    );
};

export default LandingPage;
