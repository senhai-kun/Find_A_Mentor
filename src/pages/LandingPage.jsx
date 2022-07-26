import React from "react";
import Intro from "../components/Intro";
import Instruction from "../components/Instruction";
import Recommended from "../components/Recommended";
import Discover from "../components/Discover";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

const LandingPage = () => {
    return (
        <React.Fragment>
            <Header title="Mentor" />
            <Intro />

            <Instruction />

            <Recommended />

            {/* <Discover /> */}

            <Footer />
        </React.Fragment>
    );
};

export default LandingPage;
