import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { styled } from '@mui/system'
import footer from '../asset/footer.svg'


const Image = styled('img')( () => ({
    width:  550,
    height: 500,
}) )

const Discover = () => {
  return (
    <Box sx={{ backgroundColor: '#160957', pb: 10 }} >
        <Container sx={{ textAlign: 'center' }} >
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
    </Box>
  )
}

export default Discover