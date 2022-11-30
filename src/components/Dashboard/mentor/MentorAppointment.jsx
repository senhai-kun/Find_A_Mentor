import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import baseUrl from '../../../utils/baseUrl';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonth from '@mui/icons-material/CalendarToday';

const MentorAppointment = ({ appointment }) => {
    const [cancelLoading, setCancelLoading] = useState({});

    return appointment.map( (mentee) => (
        <Box mb={2} key={mentee?._id?._id}>
            <Typography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h5"
                // align="center"
            >
                {mentee?._id?.firstname} {mentee?._id?.lastname}
            </Typography>
            <Typography variant="body1" fontWeight={300} >
                {mentee?._id?.email}
            </Typography>
            <Typography variant="body1" fontWeight={300} >
                {mentee?._id?.phone}
            </Typography>

            { mentee.schedule.map( sched => sched._id.cancel? "" : (
                <React.Fragment key={sched._id._id}>
                    <Divider>
                        <Typography
                            variant="body2"
                            fontWeight={300}
                            p={1}
                        >
                            {moment(sched?._id?.from).calendar()}
                        </Typography>

                    </Divider>
                    <Paper
                        sx={{
                            backgroundColor: (theme) =>
                                alpha(sched?._id?.approved ? theme.palette.success.light : theme.palette.primary.light,0.5),
                            p: 2,
                            borderRadius: 5,
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
                                <Stack direction="row" alignItems="center" gap={2}>

                                    <CalendarMonth fontSize="large" />

                                    <Divider orientation="vertical" flexItem />

                                    <Stack direction="column" gap={1} >
                                        <Typography variant="h6" fontWeight={700}>
                                            {moment(sched?._id?.from).format('LL')}
                                        </Typography>

                                        <Stack direction="row" alignItems="center" gap={0.2} mb={1} >
                                            <Typography >{moment(sched?._id?.from).format('LT')}</Typography> 
                                            - 
                                            <Typography >{moment(sched?._id?.to).format('LT')}  </Typography>
                                            <ScheduleIcon />
                                        </Stack>
                                            
                                    </Stack>

                                </Stack>
                            </Box>
                            <Box>   
                                <Typography>
                                    {sched?._id?.approved ? "Approved" : "Pending"}
                                </Typography>
                            </Box>

                                {/* <Stack sx={{ mt: 0 }}>
                                    <Typography fontSize={17} >
                                        Starts: <Typography component="span" fontSize={17} fontWeight={700} >{moment(sched?._id?.from).format('llll')}</Typography>
                                    </Typography>
                                    <Typography fontSize={17} >
                                        Ends: <Typography component="span" fontSize={17} fontWeight={700} >{moment(sched?._id?.to).format('llll')}</Typography>
                                    </Typography>
                                </Stack> */}
                            {/* <Box>
                                <Typography>
                                    {sched?._id?.approved ? "Approved" : "Pending"}
                                </Typography>
                            </Box> */}
                        </Stack>

                        <Divider  />

                        { !sched?._id?.approved && 
                            <Stack direction="row" gap={1} mt={1} justifyContent="end" >
                                <LoadingButton 
                                    loading={cancelLoading[sched?._id?._id]}
                                    variant="contained"
                                    color="inherit"
                                    onClick={async () => {
                                        setCancelLoading( prev => ({ ...prev, [sched?._id?._id]: true }) )
                                        try {
        
                                            const res = await axios.get(`${baseUrl}/mentor/schedule/cancel/${ sched?._id?._id }`, {
                                                headers: {
                                                    Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                                                },
                                                withCredentials: true,
                                            });
        
                                            console.log(res.data)
        
                                            if(res.data.success) {
                                                window.location.reload();
                                            }
        
                                        } catch (error) {
                                            console.log(error);
                                            alert(`Error occured: ${error.response.data.msg}`)
                                        } finally {
                                            setCancelLoading( prev => ({ ...prev, [sched?._id?._id]: false }) )
                                        }
        
                                    }}
                                >
                                    Cancel
                                </LoadingButton>
                            </Stack> 
                        }
                        
                        {sched?._id?.approved && moment(sched?._id?.to).isBefore() && 
                        <Box sx={{ pt: 2 }}>
                            <Typography>
                                Rating Status: { sched?._id?.rating?.rated ? "Rated" : "Pending" }
                            </Typography>
                        </Box>}

                        {moment(sched?._id?.to).isBefore() && !sched?._id?.done && sched?._id?.approved &&
                        <Box sx={{ pt: 2, textAlign: 'right' }}>
                            <Button variant="contained" color="success" endIcon={<DoneAllRoundedIcon />} onClick={ async () => {
                                try {

                                    const res = await axios.get(`${baseUrl}/mentor/schedule/done/${ sched?._id?._id }`, {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                                        },
                                        withCredentials: true,
                                    });

                                    console.log(res.data)

                                    if(res.data.success) {
                                        window.location.reload();
                                    }

                                } catch (error) {
                                    console.log(error);
                                    alert(`Error occured: ${error.response.data.msg}`)
                                }

                            }} >Mark as Done</Button>
                        </Box>}
                    </Paper>
                </React.Fragment>
            ) ) }
        </Box>
    ))
}

export default MentorAppointment