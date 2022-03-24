import React from 'react'
import { Box, Button, Container, Stack, styled, Typography } from '@mui/material'
import bg from '../asset/map.svg'

const Arrow = styled('div')( () => ({
    width: 20,
    height: 20,
    padding: 2,
    backgroundColor: 'inherit',
    transform: 'rotate(45deg)',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // right: '50%',
}) )

const Intro = () => {

    const scroller = () => {
        const section = document.querySelector('.section')
        section.scrollIntoView({ behavior: 'smooth' })
    }

    return (
    <Box sx={{ backgroundColor: '#cbf2f7', position: 'relative'}}>
        <Container>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' >
                <Stack sx={{ width: '100%', m: 'auto', pt: { xs: 20, sm: 10 }, pb: 5  }} alignItems='center' >
                    <Typography variant='h2' fontWeight='bold' align='center' >
                        Find Your Mentor
                    </Typography>
                    <Typography align='center' >Search, Browse, Pick, Schedule and Learn!</Typography>
                    {/* <Typography align='center' >Want to ace your next job interview? Successfully build your startup? Itching to learn high-demand skills? Work smart with an online mentor or coach by your side to offer expert advice and guidance to match your zeal. Become unstoppable using MentorCruise.</Typography> */}
                    
                    <Box sx={{ mt: 4, zIndex: 1 }} >
                        <Button variant="contained" size='large' onClick={scroller} >
                            Get Started!
                        </Button>
                    </Box>
                </Stack>

                <Box
                    sx={{ 
                        width: '100%',
                        height: {
                            xs: 450,
                            sm: 500,
                            md: 550,
                            lg: 650
                        },
                        padding: 2,
                        paddingLeft: 5,
                        pb: {
                            xs: 10
                        },

                    }}
                >
                    <img 
                        src={bg}
                        alt="logo"
                        width='100%'
                        height='100%'
                   
                    />
                </Box>
            </Stack>

        </Container>
        <Arrow />

    </Box>
    )
}

export default Intro