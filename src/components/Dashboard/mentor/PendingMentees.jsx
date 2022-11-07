import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import Section from '../../../reusable/Section';
import baseUrl from '../../../utils/baseUrl';

const PendingMentees = ({ pendingList }) => {
    const [openReject, setOpenReject] = useState(false);
    const [rejectData, setRejectData] = useState({})
    const [acceptLoading, setAcceptLoading] = useState({});
    const [rejectLoading, setRejectLoading] = useState(false);

    const saveStatus = async (id, mode) => {
        try {
            const res = await axios.post(`${baseUrl}/mentor/accept`, { mentee_id: id, mode }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                },
                withCredentials: true,
            })

            console.log(res.data);
            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
            alert(`There was an error: ${error.response.data.msg}`);
        } 
    }

    const handleClick = async (i, mode) => {
        console.log(i);
        console.log("mentee: ", i._id._id, mode);

        if( mode === "accepted") {
            await saveStatus(i._id._id, mode);

            setAcceptLoading( prev => ({ ...prev, [i._id._id]: false }) );
            
        }

        if( mode ==="rejected" ) {
            setOpenReject(true);
            setRejectData({mentee: i, mode: mode});
        }
      
    }

    const handleReject = async () => {
        setRejectLoading(true);
        await saveStatus(rejectData.mentee._id._id, rejectData.mode);
        setRejectLoading(false);
    }

    return (
        <React.Fragment>
            <Section title="Pending Mentee" subtitle="Enrolling Requests" >
                { pendingList.length === 0 ? 
                <Typography variant="h5" align="center" >"No Pending Requests..." </Typography>
                : 
                (<Stack direction="column" gap={3}  >
                    { pendingList?.map( i => (
                        <Paper elevation={6} sx={{ p: 2, borderRadius: 2, bgcolor: theme => alpha(theme.palette.warning.dark, 0), overflow: "auto" }} key={i._id._id} >
                            <Stack direction="row" >
                                
                                <Avatar 
                                    src={i._id.img}
                                    alt={i._id.firstname}
                                    sx={{ width: 90, height: 90 }}
                                    variant="rounded"
                                />
                                <Box pl={2}>
                                    <Typography variant="h6" fontWeight="bold" textTransform="capitalize" >{i._id.firstname} {i._id.lastname}</Typography>
                                    <Typography fontWeight={300} >{i._id.email}</Typography>
                                    <Typography fontWeight={300}>{i._id.coordinates.address ? i._id.coordinates.address : "Location address not set!"}</Typography>
                                </Box>
                            </Stack>  

                            <Divider sx={{ pt: 1 }} />

                            <Box sx={{ pt: 1 }} >
                                <Typography>Message: {i.status.message}</Typography>
                            </Box>

                            <Stack mt={2} gap={2} direction="row" justifyContent="end" >
                                <Button variant="outlined" color="error" onClick={ () => handleClick(i, "rejected") } >Reject</Button>
                                <LoadingButton 
                                    loading={acceptLoading[i._id._id] || false} 
                                    onClick={ () => {
                                        handleClick(i, "accepted")
                                        setAcceptLoading( prev => ({ ...prev, [i._id._id]: true }) )
                                    } } 
                                    variant="contained" 
                                >
                                    Accept
                                </LoadingButton>
                            </Stack>
                        </Paper>
                    ) )}
                </Stack>)
            }
            </Section>
            <Dialog
                open={openReject}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle sx={{ textTransform: "capitalize" }} id="alert-dialog-title">
                    Reject {rejectData?.mentee?._id?.firstname} {rejectData?.mentee?._id?.lastname} enrollment?
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1" id="alert-dialog-description">
                        You are about to reject <Typography component="span" fontWeight="bold" >{rejectData?.mentee?._id?.firstname} {rejectData?.mentee?._id?.lastname}</Typography>'s enrollment!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={() => setOpenReject(false)} >Close</Button>
                    <LoadingButton loading={rejectLoading} variant="contained" color="error" onClick={handleReject} autoFocus>
                        Reject
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default PendingMentees