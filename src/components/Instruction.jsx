import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material';
import chat from '../asset/chat.png'
import shortcut from '../asset/shortcut.png'
import video from '../asset/video.png'
import { styled } from '@mui/system';

const Icon = styled('img')( () => ({
    width: 100,
    height: 100,
    marginBottom: 20
}) )

const Card = ({ title, icon }) => {
    return (
        <Box sx={{ width: { xs: '50%', sm: '100%' }, m: 'auto'}}   >
            <Stack alignItems='center' elevation={10}  >
                <Icon 
                    src={icon}
                    alt='chat'
                    sx={{
                        width: {
                            xs: 60,
                            sm: 80
                        },
                        height: {
                            xs: 60,
                            sm: 80
                        },
                    }}
                />
                <Typography variant='h5' align='center' >{title}</Typography>
            </Stack>
        </Box>
    )
}

const Instruction = () => {
    return (
        <Container >

           <Typography variant='h3' fontWeight='500' sx={{ mb: 8, mt: 10 }}  >Learn that new skill, improve yourself more, land your dream career.</Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'center', sm: 'baseline' }}  >
                <Card 
                    title='Expert mentorship. One text away.' 
                    icon={chat}
                />
                <Card 
                    title='Shortcut growth through expert guidance.' 
                    icon={shortcut}
                />
                <Card 
                    title='Talk it out. Face-to-face.' 
                    icon={video}
                />

            </Stack>
        </Container>
    )
}

export default Instruction