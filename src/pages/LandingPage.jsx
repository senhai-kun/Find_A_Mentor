import React from "react";
import Intro from "../components/Intro";
import Instruction from "../components/Instruction";
import Recommended from "../components/Recommended";
import Footer from "../components/Footer";
import Header from "../components/Header";

const LandingPage = () => {
    return (
        <React.Fragment>
            <Header title="Mentor" />
            <Intro />

            <Instruction />

            <Recommended />

            <Footer />
        </React.Fragment>
    );
};

export default LandingPage;
