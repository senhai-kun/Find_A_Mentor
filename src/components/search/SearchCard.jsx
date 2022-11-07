import React from 'react'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Avatar, Button, Chip, Divider,  Paper, Rating, Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SearchCard = ({ fullname, img, profession, rating, isVerified,  about, skills, ref_id }) => {
    const navigate = useNavigate();

    return (
        <Paper sx={{ p: 2, border: '2px solid rgb(229 231 235)', borderRadius: 5 }} elevation={0} >
            <Stack direction={{ xs: 'column', sm: 'row' }}  spacing={3} >
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={3} >
                    <Avatar 
                        src={img}
                        alt={fullname}
                        sx={{ width: { xs: 150, sm: 190 }, height: { xs: 170, sm: 250 }, alignSelf: { xs: 'center', sm: 'start' }, cursor: "pointer" }}
                        variant='rounded'
                        onClick={ () => navigate(`/mentor/profile/${ref_id}/${fullname.replace(" ", "_")}`)} 
                    />

                    <Box width='100%' >
                        <Stack direction='row' spacing={1} >
                            <Typography 
                                variant='h4' 
                                fontWeight='bolder' 
                                mt={1} 
                                textTransform="capitalize"
                                sx={{ cursor: "pointer" }}
                                onClick={ () => navigate(`/mentor/profile/${ref_id}/${fullname.replace(" ", "_")}`)} 
                            >
                                {fullname}
                            </Typography>
                            <VerifiedRoundedIcon sx={{ display: isVerified ? 'block' : 'none' }} fontSize='small' color='primary' />
                        </Stack>

                        <Typography variant='body1' mb={1} >{profession}</Typography>

                        <Stack direction='row' alignItems='center' spacing={1} >
                            <Rating  defaultValue={rating} size="medium" readOnly precision={0.1} />
                            <Typography>({rating}) ratings</Typography>
                        </Stack>

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
                                <Chip key={e} label={i}  />
                            ))}
                            
                        </Stack>
                        
                        
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} alignItems='center' mb={2} spacing={1} >
                            <Button onClick={ () => navigate(`/mentor/profile/${ref_id}/${fullname.replace(" ", "_")}`)} variant='contained' color='primary' size='large' sx={{ width: { xs: '100%', sm: '90%', md: '30%' } }} >View Profile</Button>
                        </Stack>
                    </Box>
                </Stack>

                
            </Stack>
        </Paper>
    )
}

export default SearchCard;