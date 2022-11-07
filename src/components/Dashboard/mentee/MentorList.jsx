import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Section from '../../../reusable/Section';

const MentorList = ({mentor, user}) => {
    const navigate = useNavigate();
    const [acceptedMentor, setAcceptedMentor] = useState([]);
    console.log("accepted: ",acceptedMentor)
    useEffect( () => {
        setAcceptedMentor(mentor?.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user?.ref_id && data.status.mode === "accepted" ) }) ))

    }, [mentor, user])

    return (
        <Box sx={{ width: "100%" }} >
            <Section title="Mentors" subtitle="Lists of your Mentors.">
                <Stack sx={{ mt: 2 }} gap={5}>
                    {acceptedMentor?.map( (i, index) => i?.mentee.length === 0 ? "" : (
                       <Stack key={index} direction="row" >
                        <Avatar 
                            src={i?._id?.img} 
                            alt={i?._id?.ref_id}  
                            // variant="rounded"
                            sx={{
                                height: 100,
                                width: 100
                            }}
                        />
                        <Box ml={2}>
                            <Typography variant="h6" textTransform="capitalize" >{i?._id?.firstname} {i?._id?.lastname}</Typography>
                            <Typography fontWeight={300} >{i?._id?.email}</Typography> 

                            <Box pt={1} >
                                <Button variant="outlined" size="small" color="inherit" onClick={ () => navigate(`/mentor/profile/${i?._id?.ref_id}/${i?._id?.firstname + "_" + i?._id?.lastname}`) } >Go to Profile</Button>
                            </Box> 
                        </Box>
                        
                    </Stack>
                    ))}
                </Stack>
            </Section>
        </Box>
    )
}


export default MentorList