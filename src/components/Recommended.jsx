import { Avatar, Box, Button, Container, Divider, Rating, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import convo from "../asset/groups.png"

const style = makeStyles( (theme) => ({
    bg: {
        backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(180deg, #f3f7fa 0%, #b7e8ee 61%, #92d7f2 100%)',
        marginTop: theme.spacing(20),
        paddingBottom: theme.spacing(10)
    }
}))

// const convo = 'https://cdn.mentorcruise.com/img/home/screenshots/conversation_1x.png'
const ava1 = 'https://cdn.mentorcruise.com/img/faces/ayla.png'

const Image = styled('img')( () => ({
    width:  550,
    height: 400,
}) )

const CardDetails = ({ title, sub, notAvail }) => {
    return (
        <Stack sx={{ backgroundColor: !notAvail ? 'rgba(146, 215, 242, 0.2)' : 'rgba(242, 146, 180, 0.2)', p: 1, borderRadius: 2, mt: 1 }} direction='row' justifyContent='space-between' alignItems='center' >
            <Typography variant="body2" >{title}</Typography>
            <Typography variant="body2" color={!notAvail ? "#24c9c4" : '#e00251'} >{sub}</Typography>
        </Stack>
    )
}

const Card = ({ name, course, rating, img, online, meetup, solo }) => {
    return (
        <Box sx={{ backgroundColor: '#fff', p: { xs: 3, sm: 5 }, borderRadius: 2, m: 3 }} boxShadow={10} >
            <Stack direction='row' justifyContent='space-between' >
                <Box sx={{ mr: 5 }} >
                    <Typography fontWeight='600' >{name}</Typography>
                    <Typography sx={{ opacity: 0.6 }} fontWeight='400' >{course}</Typography>
                    <Rating 
                        defaultValue={rating}
                        precision={0.5}
                        readOnly
                        sx={{ opacity: 0.8 }}
                        size="small"
                    />
                </Box>

                <Avatar src={img} alt={name} sx={{ width: 64, height: 64 }} />

            </Stack>
            
            <Divider sx={{ mt: 2, mb: 2 }} />
            
            <Box mt={5} >
                <CardDetails title="Online/Meetup" sub="Available"  />
                {/* <CardDetails title="Solo" sub="Not" notAvail /> */}
                <CardDetails title="Groups" sub="3/5"  />

                <CardDetails title="Mentorship Solo" sub="20k/month"  />
                <CardDetails title="Mentorship Group" sub="5k/month"  />
            </Box>

            <Button variant="contained" sx={{ mt: 3 }} fullWidth >Apply Now</Button>
        </Box>
    )
}

const Recommended = () => {
    const classes = style();

    const navigate = useNavigate();

    return (
        <Box className={classes.bg} >
            <Container>
                <Stack direction={{ xs: "column", md: "row" }} alignItems="center" >
                    <Box className='section' sx={{ textAlign: 'center', mb: 1, width: '100%', scrollMargin: 80 }} >
                        <Image 
                            src={convo}
                            alt="img"
                            sx={{
                                width: {
                                    xs: 300,
                                    sm: 450,
                                    md: 650
                                },
                                height: {
                                    xs: 300,
                                    sm: 400,
                                    md: 450
                                },
                                mt: { xs: 2, md: 5},
                                mb: { xs: 2, md: 5}
                            }}
                        />

                    </Box>

                    <Box width="100%">
                        <Typography variant="h3" align='center' fontWeight='500' sx={{ mt: 10, mb: 10  }} >
                            Explore and Meet different people who can guide you to your own journey.
                        </Typography>
                    </Box>

                </Stack>
                

                        
                {/* <Stack direction='row' justifyContent='center' flexWrap="wrap" flexGrow={1} >
                    <Card 
                        name="Ayla S."
                        course="Marketing Expert"
                        rating={4.5}
                        img={ava1}
                    />

                    <Card 
                        name="Ayla S."
                        course="Marketing Expert"
                        rating={5}
                        img={ava1}
                    />
                    <Card 
                        name="Ayla S."
                        course="Marketing Expert"
                        rating={4.5}
                        img={ava1}
                    />
                   
                </Stack> */}
                
                <Box sx={{ textAlign: 'center', mt: 5 }} >
                    <Button onClick={ () => navigate('/search', { replace: true }) } variant='contained' color='primary' size='large' sx={{ width: { xs: '80%', sm: '40%' } }} >Browse Mentors</Button>
                </Box>
            
            </Container>
        </Box>
    )
}

export default Recommended