import React from 'react'
import { Box, Button, Stack, TextField, Typography, InputAdornment, Divider, Avatar, styled, Checkbox } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import loginbg from '../asset/login.svg'
import registerbg from '../asset/register.svg'
import Register from './Register';
import { useLocation, useNavigate } from 'react-router-dom';

const textColorPri = '#144ec7';
const textColorSec = '#0028f3';

const LoginContainer = () => {
    const location = useLocation()

    return (
        <Stack direction='row' height='100vh'  >
            { location.pathname === '/account/login' ? <Login /> : <Register /> }

            <Bg />
        </Stack>
    )
}

const Login = () => {
    const navigate = useNavigate()

    return (
        <Box width='100%' position='relative' >
            <Box width={{ xs: '80%', sm: '50%', md: '80%', lg: '50%' }} m='auto' position='absolute' top='50%' left='50%' sx={{ transform: 'translate(-50%,-50%)' }} >
                <Typography variant='h4' fontWeight='600' color={textColorPri} mb={1} >Login to your account.</Typography>

                <Typography color={textColorPri} sx={{ opacity: 0.8 }} mb={5} variant="body1" >Welcome Back! Please enter your details.</Typography>
                
                <Stack direction='column' spacing={3} width='100%' mt={2} >
                    <TextField 
                        size='medium'
                        placeholder='Username'
                        type='text'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' >
                                    <AccountCircleOutlinedIcon color='primary' />
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
                    <Checkbox color='primary' sx={{ opacity: 0.6 }} />
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
        <Box bgcolor={location.pathname === '/account/login' ? textColorPri : "#ed6c02"} width='100%' display={{ xs: 'none', sm: 'none', md: 'block' }} textAlign='center' position='relative' >
            <Image 
                alt='asd'
                src={ location.pathname === '/account/login' ? loginbg : registerbg }
            />
        </Box>
    )
}

export default LoginContainer