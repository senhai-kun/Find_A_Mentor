import { Avatar, Box, Rating, Stack, Typography } from '@mui/material'
import React from 'react'

const Profile = ({ name, img, rate, course }) => {
    return (
        <Box>
            <Avatar
                src='https://chpic.su/_data/stickers/k/Kazuma_WoS/Kazuma_WoS_001.webp'
                alt='prof'
                sx={{ width: 150, height: 150 }}
            />
            <Stack alignItems='center' >
                <Typography fontSize={18.5} align="center" >{name}</Typography>
                <Rating 
                    defaultValue={rate}
                    precision={0.5}
                    readOnly
                />
                <Typography fontSize={13} sx={{ opacity: 0.8 }} >{rate} ratings</Typography>
            </Stack>
        </Box>
    )
}

const TopMentors = () => {
  return (
    <div>
        <Typography variant='h5' fontWeight='bold' className='section' sx={{ scrollMargin: 80 }} >Discover our Top Mentors</Typography>

        <Stack sx={{ mt: 5, flexWrap: 'wrap', flexShrink: 1 }} direction='row' justifyContent='space-between'  >
            <Profile name='First Lastname' rate={4.5} />
            <Profile name='First Lastname' rate={4} />
            <Profile name='First Lastname' rate={5} />
            <Profile name='First Lastname' rate={4.5} />
            <Profile name='First Lastname' rate={5} />
        </Stack>
    </div>
  )
}

export default TopMentors