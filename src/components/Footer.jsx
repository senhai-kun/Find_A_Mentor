import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#0c0147', pb: 8 }} >
            <Box textAlign='left' color='white' bgcolor="#0c0147" p={1} pb={10} position="relative" >
                <Container >
                    <Stack direction='row' spacing={0.5} alignItems='center' >
                        <FindInPageRoundedIcon  />
                        <Typography variant='inherit' fontWeight='400' color="white" >
                            Find A Mentor
                        </Typography>
                    </Stack>

                    <Stack direction='row' mt={2} spacing={{ xs: 0, sm: 5 }} flexWrap='wrap' justifyContent={{ xs: 'flex-start', sm: 'center' }} alignItems="flex-start" >
                        <Box>
                            <Typography color="white" >Lead By:</Typography>
                            <Box ml={2} sx={{ opacity: 0.6 }} >
                                <Typography color="white" >Irish Santos</Typography>
                            </Box>
                        </Box>

                        <Box >
                            <Typography color="white" >Members:</Typography>

                            <Box ml={2} sx={{ opacity: 0.6 }} >
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