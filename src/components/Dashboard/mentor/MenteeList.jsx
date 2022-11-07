import { Avatar, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Section from '../../../reusable/Section'

const MenteeList = ({mentee}) => {
    return (
        <Box sx={{width: "100%" }} >
            <Section title="Mentees" subtitle="Lists of your Mentees.">

            <Stack sx={{ mt: 2 }}  gap={4}>
                {mentee?.map( (i, index) => (
                    <Stack key={index} direction="row" >
                        <Avatar 
                            src={i?._id?.img} 
                            alt={i?._id?.firstname}  
                            // variant="rounded"
                            sx={{
                                height: 100,
                                width: 100
                            }}
                        />
                        <Box ml={2}>
                            <Typography variant="h6" textTransform="capitalize" >{i?._id?.firstname} {i?._id?.lastname}</Typography>
                            <Typography fontWeight={300} >{i?._id?.email}</Typography>  
                        </Box>
                        
                    </Stack>
                ))}
            </Stack>

            </Section>
        </Box>
    )
}

export default MenteeList