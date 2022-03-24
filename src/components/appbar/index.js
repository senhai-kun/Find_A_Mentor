import { AppBar, Box, Button, Container, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material'
import React, { useState } from 'react'
import Search from './Search'
import { Spiral  as Hamburger } from 'hamburger-react'
import { makeStyles } from '@mui/styles'

const style = makeStyles( (theme) => ({
    menuWrapper: {
        position: 'absolute',
        backgroundColor: 'white',
        textAlign: 'center',
        width: '100%',
        height: '100vh',
        top: '100%',
        transition: 'all .5s ease',
    },
    close: {
        left: '-100%',
        // backgroundColor: 'white',
        width: '100%',
        transition: 'all .5s ease-out',

    },
    open: {
        // position: 'sticky',
        top: '100%',
        left: '0%',
        backgroundColor: 'white',
        // width: '100%',
        // textAlign: 'center',
        transition: 'all .5s ease',
    }
}) )

const Header = () => {
    const classes = style()
    const [isOpen, setOpen] = useState(false)

    const scroll = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return (
        <Box  >
            <AppBar position='fixed' color={ isOpen || scroll ? 'inherit' : 'transparent' } elevation={ isOpen || scroll ? 5 : 0} enableColorOnDark  >
                <Toolbar  >
                    <Container>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'  >
                            <Typography variant="h5" fontWeight='bolder' >MENTOR</Typography>
                            
                            <Box sx={{ display: { xs: 'flex', sm: 'none' } }} >
                                <Hamburger toggled={isOpen} toggle={setOpen} />
                            </Box>

                            <Stack direction='row' spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }} >
                                <Button type='text' sx={{ color: 'black' }}  >Home</Button>
                                <Button type='text' sx={{ color: 'black' }}  >Become a mentor</Button>
                                <Button type='text' sx={{ color: 'black' }}  >Login</Button>

                                <Box sx={{ display: { sm: 'none', md: 'block' } }} >
                                    <Search />                        
                                </Box>    
                            </Stack>     
                        </Stack>
                    </Container>
                </Toolbar>

                <Box className={[ classes.menuWrapper, isOpen ? classes.open : classes.close ]} >
                    <Stack direction='column' spacing={5} sx={{ p: 5 }} >
                        <Button type='text' sx={{ color: 'black' }} size='large'  >Home</Button>
                        <Button type='text' sx={{ color: 'black' }} size='large'  >Become a mentor</Button>
                        <Button type='text' sx={{ color: 'black' }} size='large'  >Login</Button>
                    </Stack>
                </Box>
                
            </AppBar>

           
        </Box>
    )
}

export default Header