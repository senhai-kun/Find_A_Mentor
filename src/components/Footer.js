import React from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import footer from '../asset/footer.svg'
import { styled } from '@mui/system'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';

const Image = styled('img')( () => ({
    width:  550,
    height: 500,
}) )

const Footer = () => {

    return (
        <Box sx={{ backgroundColor: '#160957' }} >
            <Container sx={{ textAlign: 'center', }} >

                <Typography variant="h3" align='right' fontWeight='400' sx={{ mt: 10, mb: { xs: 5, sm: 10 }, width: { xs: '100%', sm: '90%' }, float: 'right', color: 'white' }} >
                    Discover different mentors like discovering the world.
                </Typography>

                <Box sx={{ mb: 0 }} >
                    <Image 
                        src={footer}
                        alt="footer"
                        variant='square'
                        sx={{
                            width: '100%',
                            height: 450,
                        }}
                    />

                </Box>
            
                <Button onClick={ ( ) => console.log("fb.com") } variant="contained" color='success' fullWidth size='large' sx={{ mt: 5, width: { xs: '85%', sm: '40%' } }} >Find my mentor</Button>
                

            </Container>
            
            <Box textAlign='left' color='white' bgcolor="#0c0147" mt={5} p={1} pb={10} position="relative" >
                <Container >
                    <Stack direction='row' spacing={0.5} alignItems='center' >
                        <FindInPageRoundedIcon  />
                        <Typography variant='inherit' fontWeight='400' color="white" >
                            Find A Mentor
                        </Typography>
                    </Stack>

                    <Stack direction='row' mt={2} spacing={2} flexWrap='wrap' justifyContent='center' alignItems="flex-start" >
                        <Box>
                            <Typography color="white" >Lead By:</Typography>
                            <Box ml={2} sx={{ opacity: 0.8 }} >
                                <Typography color="white" >Irish Santos</Typography>
                            </Box>
                        </Box>

                        <Box >
                            <Typography color="white" >Members:</Typography>

                            <Box ml={2} sx={{ opacity: 0.8 }} >
                                <Typography color="white" >Agustin Agapito</Typography>
                                <Typography color="white" >Kenneth Yalong</Typography>
                                <Typography color="white" >Sky DeJesus</Typography>
                                <Typography color="white" >Dennis Acosta Ruiz</Typography>
                            </Box>

                        </Box>
                        
                    </Stack>

                    <Typography align='center' alignSelf="end" color="white"
                        sx={{ 
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            opacity: 0.8
                        }}
                    >
                        ©2022 Find A Mentor. All Rights Reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default Footer