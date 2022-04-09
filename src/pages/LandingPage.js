import React from 'react'
import Intro from '../components/Intro'
import Instruction from '../components/Instruction'
import Recommended from '../components/Recommended'
import Footer from '../components/Footer'   

const LandingPage = () => {

    return (
        <React.Fragment>

            <Intro />

            <Instruction />

            <Recommended />

            <Footer />            
                
        </React.Fragment>
    )
}

export default LandingPage
