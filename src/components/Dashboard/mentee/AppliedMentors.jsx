import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Section from '../../../reusable/Section';


const AppliedMentors = ({ mentor, user }) => {
    const [pendingMentor, setPendingMentor] = useState([]);
    const [rejectedMentor, setRejectedMentor] = useState([])
    console.log("pending: ",pendingMentor)
    useEffect( () => {
        setPendingMentor(mentor?.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user?.ref_id && data.status.mode === "pending" ) }) ))
        setRejectedMentor(mentor?.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user?.ref_id && data.status.mode === "rejected" ) }) ))

    }, [mentor, user])

    return (
        <Section title="Applied Mentors"  >
            <Typography color="green" variant="h6" fontWeight={500} mb={1} mt={5}>
                Pending
            </Typography>

            <Stack sx={{ mt: 2 }} gap={5}>
                {pendingMentor?.map( (i, index) => i?.mentee.length === 0 ? "" : (
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
                        <Typography>Status: Pending</Typography>
                    </Box>
                    
                </Stack>
                ))}
            </Stack>

            <Typography color="darkred" variant="h6" fontWeight={500} mb={1} mt={5}>
                Rejected
            </Typography>

            <Stack sx={{ mt: 2 }} gap={5}>
                {rejectedMentor?.map( (i, index) => i?.mentee.length === 0 ? "" : (
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
                        <Typography color="error" >Status: Rejected</Typography>
                    </Box>
                    
                </Stack>
                ))}
            </Stack>
        </Section>
    )
}


export default AppliedMentors