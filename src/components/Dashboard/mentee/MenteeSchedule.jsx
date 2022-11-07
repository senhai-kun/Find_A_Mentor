import React from 'react'
import { alpha, Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import baseUrl from '../../../utils/baseUrl'
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import Section from '../../../reusable/Section'

const MenteeSchedule = ({ menteeSched }) => {
    console.log("mentee schedL: ", menteeSched)
    return (
        <Section title="Schedule" subtitle="Pending Schedule">

            <Stack direction="column" gap={2}>
                {menteeSched?.map( i => (
                    <React.Fragment key={i._id._id}>
                        {i?.mentee?.map( mentee => (
                            <React.Fragment key={mentee?._id._id} >
                                {mentee?.schedule?.map( sched => sched._id.cancel? "" : (
                                    <React.Fragment key={sched?._id?._id} >
                                        <Paper
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    alpha(
                                                        theme.palette.warning
                                                            .light,
                                                        0.2
                                                    ),
                                                p: 2,
                                                borderRadius: 4,
                                            }}
                                            elevation={0}
                                        >

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                gap={1}
                                                alignItems="center"
                                            >
                                                <Box>
                                                    <Typography color="inherit" fontWeight="bold" textTransform="capitalize" variant="h6" >{i?._id?.firstname} {i?._id?.lastname}</Typography>
                                                    <Typography variant="body2" fontWeight={300}>{i?._id?.email}</Typography>

                                                    <Stack sx={{ mt: 1 }}>
                                                        <Typography 
                                                            variant="body2"
                                                            fontWeight={300}
                                                        >
                                                            Start: <Typography component="span" fontSize={17} fontWeight={700}>{moment(sched?._id?.from).format('lll')}</Typography>
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            fontWeight={300}
                                                        >
                                                            End: <Typography component="span" fontSize={17} fontWeight={700}>{moment(sched?._id?.to).format('lll')}</Typography>
                                                        </Typography>
                                                    </Stack>
                                                </Box>

                                                <Box>
                                                    <IconButton onClick={ async () => { 
                                                            try {
                                                                const res = await axios.post(`${baseUrl}/mentee/schedule/approved`, {sched_id: sched?._id?._id} , {
                                                                    headers: {
                                                                        Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                                                                    },
                                                                    withCredentials: true,
                                                                })

                                                                window.location.reload();
                                                                console.log(res.data)
                                                            } catch (error) {
                                                                console.log(error)
                                                            }
                                                        } }  >
                                                        <DoneOutlineRoundedIcon />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        
                                        </Paper>
                                    </React.Fragment>
                                ) )}
                            </React.Fragment>
                        ) )}
                    </React.Fragment>
                ))}
            </Stack>
        </Section>
    )
}


export default MenteeSchedule