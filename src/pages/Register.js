import React from 'react'
import { Box, Button, Divider, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useNavigate } from 'react-router-dom';

const textColorPri = '#ed6c02';
const textColorSec = '#e8934d';


const Register = () => {
    const navigate = useNavigate()

    return (
        <Box width='100%' position='relative' >
            <Box width={{ xs: '80%', sm: '50%', md: '80%', lg: '50%' }} m='auto' position='absolute' top='50%' left='50%' sx={{ transform: 'translate(-50%,-50%)' }} >
                <Typography variant='h4' fontWeight='600' color={textColorPri} mb={1} >Create an account account.</Typography>

                <Typography color={textColorPri} sx={{ opacity: 0.8 }} mb={5} variant="body1" >Welcome Back! Please enter your details.</Typography>
                
                <Stack direction='column' spacing={3} width='100%' mt={2} mb={3} >
                    <TextField 
                        size='medium'
                        placeholder='Username'
                        type='text'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' >
                                    <AccountCircleOutlinedIcon color='warning' />
                                </InputAdornment>
                            ),
                            sx: { color: textColorPri }
                        }}
                        variant='outlined'
                        focused
                        color='warning'
                    />
                    <TextField 
                        size='medium'
                        placeholder='Email'
                        type='email'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' >
                                    <EmailOutlinedIcon color='warning' />
                                </InputAdornment>
                            ),
                            sx: { color: textColorPri }
                        }}
                        variant='outlined'
                        focused
                        color='warning'
                    />

                    <TextField 
                        size='medium'
                        placeholder='Password'
                        type='password'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' >
                                    <KeyOutlinedIcon color='warning' sx={{ transform: 'rotate(90deg)' }} />
                                </InputAdornment>
                            ),
                            sx: { color: textColorPri }
                                
                        }}
                        variant='outlined'
                        focused
                        color='warning'
                    />  

                    <TextField 
                        size='medium'
                        placeholder='Confirm Password'
                        type='password'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' >
                                    <CheckOutlinedIcon color='warning'  />
                                </InputAdornment>
                            ),
                            sx: { color: textColorPri }
                                
                        }}
                        variant='outlined'
                        focused
                        color='warning'
                    />  

                </Stack>
                
                <Button variant='contained' fullWidth size='large' color='warning' >Register</Button>
                        
                <Divider sx={{ mt: 3, mb: 3, color: textColorSec, opacity: 0.8 }} light={false} >Already have an account?</Divider>
                
                <Button onClick={ () => navigate('/account/login') } variant='outlined' fullWidth size='large' color="primary" >Sign in</Button>
           
            </Box>
        </Box>
    )
}

export default Register