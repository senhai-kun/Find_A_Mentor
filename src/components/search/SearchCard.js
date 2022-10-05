import React from 'react'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Avatar, Button, Chip, Divider, IconButton, Paper, Rating, Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SearchCard = ({ fullname, img, profession, rating, isVerified, bookmark, about, skills, price, ref_id }) => {
    const navigate = useNavigate();

    return (
        <Paper sx={{ p: 2, border: '2px solid rgb(229 231 235)', borderRadius: 5 }} elevation={0} >
            <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={3} >
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={3} >
                    <Avatar 
                        src={img}
                        alt={fullname}
                        sx={{ width: 150, height: 170, alignSelf: { xs: 'center', sm: 'start' } }}
                        variant='rounded'

                    />

                    <Box width='100%' >
                        <Stack direction='row' spacing={1} >
                            <Typography variant='h5' fontWeight='bolder' mt={1} textTransform="capitalize" >{fullname}</Typography>
                            <VerifiedRoundedIcon sx={{ display: isVerified ? 'block' : 'none' }} fontSize='small' color='primary' />
                        </Stack>

                        <Typography variant='body1' mb={1} >{profession}</Typography>

                        <Stack direction='row' alignItems='center' spacing={1} >
                            <Rating  defaultValue={rating} size='small' readOnly />
                            <Typography>({rating}) ratings</Typography>
                        </Stack>

                        {/* <Button onClick={ () => navigate(`/mentor/profile/${fullname}`)} size='small' color='success' sx={{ mt: 1 }} >Go To Profile</Button> */}

                        <Divider sx={{ mt: 2 }} />

                        <Typography 
                            paragraph 
                            color='inherit'
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '7',
                                WebkitBoxOrient: 'vertical',
                                opacity: 0.9,
                                fontWeight: 300,
                                mt: 2,
                                mb: 5
                            }}
                        >
                            {about}
                        </Typography>


                        <Stack direction='row' flexWrap='wrap' justifyContent='start' 
                            sx={{
                                gap: 2,
                                mb: 4
                            }}
                        >
                            {skills.map( (i, e) => (
                                <Chip key={e} label={i} onClick={ () => console.log("Chip") } />
                            ))}
                            
                        </Stack>
                        
                        
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} alignItems='center' mb={2} spacing={1} >
                            <Button onClick={ () => navigate(`/mentor/profile/${ref_id}/${fullname.replace(" ", "_")}`)} variant='contained' color='primary' size='large' sx={{ width: { xs: '100%', sm: '90%', md: '30%' } }} >Enroll Now!</Button>
                        
                            <Typography variant='h6' >
                                Only
                                <Typography variant='h6' fontWeight='bold' component='span' > ₱{price} /month</Typography> 
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>

                
            </Stack>
        </Paper>
    )
}

export default SearchCard;