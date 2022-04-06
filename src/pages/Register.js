import React from 'react'
import { Box, Button, Checkbox, Divider, InputAdornment, Stack, TextField, Typography, styled  } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useNavigate } from 'react-router-dom';

const textColorPri = '#c45a04';
const textColorSec = '#c47104';


const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: textColorPri,
        },
    },
})

const Input = ({ placeholder, type, icon }) => {
    return (
        <CustomTextField 
            size='medium'
            placeholder={placeholder}
            type={type}
           
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start' >
                        {icon}
                    </InputAdornment>
                ),
                sx: {
                    color: textColorPri
                }
            }}  
            variant='outlined'
            focused
            fullWidth
        />
    )
}

const Register = () => {
    const navigate = useNavigate()

    return (
        <Box width='100%' position='relative' >
            <Box component='form' noValidate  width={{ xs: '80%', sm: '70%', md: '80%', lg: '70%' }} m='auto' position='absolute' top='50%' left='50%' sx={{ transform: 'translate(-50%,-50%)', pt: { xs: 20, sm: 10, md: 0 } }} >
                <Typography variant='h4' fontWeight='600' color={textColorPri} mb={1} >Create an account.</Typography>

                <Typography color={textColorPri} sx={{ opacity: 0.8 }} mb={5} variant="body1" >Let's get started by signing up to your account!</Typography>
                <Stack direction='row' alignItems='center' justifyContent='end' >
                    <Typography color={textColorPri} >Register as mentor</Typography>
                    <Checkbox color='warning' />

                </Stack>
                
                <Stack direction='column' spacing={3} width='100%' mt={2} mb={3} >

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}  >
                        <Input 
                            placeholder='First Name' 
                            type='text'
                            icon={<AccountCircleOutlinedIcon sx={{ color: textColorPri }} />}
                        />
                        <Input 
                            placeholder='Last Name' 
                            type='text'
                            icon={<AccountCircleOutlinedIcon sx={{ color: textColorPri }} />}
                        />

                    </Stack>
                    
                    <Input 
                        placeholder='Email' 
                        type='text'
                        icon={<EmailOutlinedIcon sx={{ color: textColorPri }} />}
                    />

                    <Input 
                        placeholder='Password' 
                        type='password'
                        icon={<KeyOutlinedIcon sx={{ color: textColorPri, transform: 'rotate(90deg)' }} />}
                    />

                    <Input 
                        placeholder='Confirm Password' 
                        type='password'
                        icon={<CheckOutlinedIcon sx={{ color: textColorPri }} />}
                    />  

                </Stack>

       
                <Button variant='contained' fullWidth size='large' color='warning' sx={{ mt: 3 }} >Register</Button>
                        
                <Divider sx={{ mt: 3, mb: 3, color: textColorPri }} light={false} >Already have an account?</Divider>
                
                <Button onClick={ () => navigate('/account/login') } variant='outlined' fullWidth size='large' color="primary" sx={{ mb: { xs: 10, sm: 0 } }} >Sign in</Button>
           
            </Box>
        </Box>
    )
}

export default Register