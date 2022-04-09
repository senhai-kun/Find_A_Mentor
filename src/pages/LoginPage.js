import React from 'react'
import { Box, Button, Stack, TextField, Typography, InputAdornment, Divider, styled, Checkbox } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import loginbg from '../asset/login.svg'
import registerbg from '../asset/register.svg'
import Register from './RegisterPage';
import { useLocation, useNavigate } from 'react-router-dom';

const textColorPri = '#144ec7';
const textColorSec = '#0028f3';

const LoginContainer = () => {
    const location = useLocation()

    return (
        <Stack direction={location.pathname === '/account/login' ? 'row' : 'row-reverse' } alignItems='center'  >
            <Bg />

            { location.pathname === '/account/login' ? <Login /> : <Register /> }

            
        </Stack>
    )
}

const Login = () => {
    const navigate = useNavigate()

    return (
        <Box width='100%' >
            <Box width={{ xs: '80%', sm: '70%', md: '80%', lg: '70%' }} m="auto" pt={5} pb={5} >
                <Typography variant='h4' fontWeight='600' color={textColorPri} mb={1} >Login to your account.</Typography>

                <Typography color={textColorPri} sx={{ opacity: 0.8 }} mb={5} variant="body1" >Welcome Back! Please enter your details.</Typography>
                
                <Stack direction='column' spacing={3} width='100%' mt={2} >
                    <TextField 
                        size='medium'
                        placeholder='Email'
                        type='text'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' >
                                    <EmailOutlinedIcon color='primary' />
                                </InputAdornment>
                            ),
                            sx: { color: textColorPri }
                        }}
                        variant='outlined'
                        focused
                        
                    />

                    <TextField 
                        size='medium'
                        placeholder='Password'
                        type='password'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' >
                                    <KeyOutlinedIcon color='primary' sx={{ transform: 'rotate(90deg)' }} />
                                </InputAdornment>
                            ),
                            sx: { color: textColorPri }
                                
                        }}
                        variant='outlined'
                        focused
                        
                    />  

                </Stack>

                <Stack direction='row' alignItems='center' mb={3} >
                    <Checkbox color='primary'  />
                    <Typography color={textColorPri} >Remember me</Typography>
                </Stack>
                
                <Button variant='contained' fullWidth size='large' >Sign in</Button>
                        
                <Divider sx={{ mt: 3, mb: 3, color: textColorSec, opacity: 0.8 }} light={false} >Don't have an account?</Divider>
                
                <Button onClick={ () => navigate('/account/register') } variant='outlined' fullWidth size='large' color="warning" >Register</Button>
           
            </Box>
        </Box>
    )
}

const Image = styled('img')( () => ({
    width: '80%',
    height: '80%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
}) )

const Bg = () => {
    const location = useLocation()
    return (
        <Box bgcolor={location.pathname === '/account/login' ? textColorPri : "#ef6c00"} width={{ sm: '0%', md: '100%' }}  position='relative' minHeight='100vh' >
            <Image 
                alt='Search Logo'
                src={ location.pathname === '/account/login' ? loginbg : registerbg }
            />
        </Box>
    )
}

export default LoginContainer