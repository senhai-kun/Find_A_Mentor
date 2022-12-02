import React, { useState, useEffect } from 'react'
import { alpha, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Rating, Stack, Typography } from '@mui/material';
import axios from 'axios';
import Message from '../../../reusable/Message';
import baseUrl from '../../../utils/baseUrl';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonth from '@mui/icons-material/CalendarToday';
import moment from "moment";

const MenteeAppointment = ({ appointment, user }) => {
    const [openRating, setOpenRating] = useState(false);
    const [rate, setRate] = useState(0);
    const [schedId, setSchedId] = useState(null);
    const [mentorId, setMentorId] = useState(null);
    const [pending, setPending] = useState(false);

    useEffect( () => {
        appointment.map( i => i.mentee.map( mentee => mentee.schedule.map( sched => {
            if(!sched._id.rated) {
                setPending(true);
                return null;
            }
            return null;
        }) ) )
    }, [appointment])

    const handleRate = ({ sched_id, mentor_id }) => {
        console.log(sched_id, mentor_id)
        setSchedId(sched_id);
        setMentorId(mentor_id);
        setOpenRating(true)
    }

    const handleSubmitRatings = async () => {
        try {
            // sched_id, rate, mentor_id
            const rated = await axios.post(`${baseUrl}/mentee/rate`, { sched_id: schedId, rate: rate, mentor_id: mentorId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                },
                withCredentials: true,
            });

            console.log(rated.data);

            if(rated.data.success) {
                window.location.reload();
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return appointment.length === 0 ? <Message msg="Nothing here yet" variant="h6" align="center" /> : appointment.map( (i,index) => (
        // parent object mentor data
        <React.Fragment key={index}> 
            {i?.mentee?.map( mentee => mentee?.schedule.length === 0 ? "" : (
                // child mentee list
                <React.Fragment key={mentee._id._id}>
                    <Box mt={1} >
                        <Typography
                            fontWeight="bold"
                            textTransform="capitalize"
                            variant="h5"
                            // align="center"
                        >
                            {i?._id?.firstname} {i?._id?.lastname}
                        </Typography>
                        <Typography variant="body1" fontWeight={300} >
                            {i?._id?.email}
                        </Typography>
                        <Typography variant="body1" fontWeight={300} >
                            {i?._id?.phone}
                        </Typography>
                    </Box>
                    { mentee?.schedule?.map( sched => sched._id.done ? "" : sched._id.cancel ? "" : (
                        // grand schedule list
                        <React.Fragment key={sched._id._id} >
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
                                    overflow: "auto"
                                }}
                                elevation={0}
                                
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    gap={1}
                                    alignItems="center"
                                >
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
                                    
                                    <Box>
                                        <Typography>
                                            {sched?._id?.approved ? "Approved" : "Pending"}
                                        </Typography>
                                    </Box>
                                </Stack>
                                
                                <Divider sx={{ mt: 0, mb: 1 }} />

                                { moment(sched?._id?.to).isBefore() && !sched?._id?.rating?.rated && sched?._id?.approved &&
                                <Box sx={{ mt: 2 }} width="100%"  >
                                    <Button variant="contained" color="success" fullWidth onClick={() => handleRate({ sched_id: sched?._id?._id, mentor_id: i?._id?._id }) }>Rate</Button>
                                </Box>} 
                                
                                {sched?._id?.rating?.rated && <Typography align="right" pt={2}>Rate Submitted!</Typography>}
                            </Paper>
                        </React.Fragment>
                    ) )}
                </React.Fragment>
            ) ) }

            <Dialog open={pending} onClose={ () => setPending(false)} >
                <DialogTitle sx={{ textTransform: "capitalize" }}>
                    Pending to Rate
                </DialogTitle>
                <DialogContent dividers>
                    A session has concluded, Please Rate your mentor on how good them is.

                    <Box sx={{ pt: 3 }}>
                      
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setPending(false)} color="inherit" variant="text" >Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openRating} onClose={ () => setOpenRating(false)} >
                <DialogTitle sx={{ textTransform: "capitalize" }}>
                    Rate: {i?._id.firstname}  {i?._id.lastname}
                </DialogTitle>
                <DialogContent dividers>
                    Rating will reflect on your Mentor's Profile.

                    <Box sx={{ pt: 3 }}>
                        <Typography>Rate</Typography>
                        <Rating 
                            value={rate}
                            onChange={ (e, newValue) => setRate(newValue)}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenRating(false)} color="inherit" variant="outlined" >Close</Button>
                    <Button variant="contained" color="success" onClick={handleSubmitRatings} >Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    ))
}


export default MenteeAppointment