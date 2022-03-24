import React from 'react'
import Header from '../components/appbar'
import TopMentors from '../components/TopMentors'
import Course from '../components/Course'
import Intro from '../components/Intro'
import Instruction from '../components/Instruction'
import Recommended from '../components/Recommended'
import Footer from '../components/Footer'

const Home = () => {

    return (
        <div>
            <Header />

            <Intro />
            {/* <Course /> */}

            <Instruction />

            <Recommended />

            <Footer />


            {/* <TopMentors /> */}

            
{/*             
            <div style={{ height: '100vh' }} ></div>
            <div style={{ height: '100vh' }} ></div>
            <div style={{ height: '100vh' }} ></div>
            <div style={{ height: '100vh' }} ></div> */}
                
        </div>
    )
}

export default Home
