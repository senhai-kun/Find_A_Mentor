import React, { useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Stack,
    Typography,
    Tabs,
    Tab,
    Divider,
    Paper,
    alpha,
    IconButton,
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    Rating,
    DialogActions,
    Snackbar,
    Alert,
    DialogContentText,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import Footer from "../components/Footer";
import AppbarSpace from "../reusable/AppbarSpace";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { userData } from "../redux/slicer/userSlice";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import moment from "moment";
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from "react-router-dom";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Loading from "../reusable/Loading";
import Message from "../reusable/Message";
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonth from '@mui/icons-material/CalendarToday';

const Details = ({ icon, label, variant, size }) => {
    return (
        <Chip
            label={label}
            icon={icon}
            onClick={() => console.log("asd")}
            variant={variant}
            size={size}
            color="primary"
        />
    );
};

const UserProfile = () => {
    const user = useSelector(userData);
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    const [mentor, setMentor] = useState([]);
    const [menteeList, setMenteeList] = useState([]);
    const [pendingList, setPendingList] = useState([])
    const [scheduleList, setScheduleList] = useState([]);
    const [setTo, setSetTo] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [menteeSched, setMenteeSched] = useState([]);
    
    const [from, setFrom] = useState(null);
    const [to, setToEnd] = useState(null);
    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect( () => {  
        const source = axios.CancelToken.source();

        const getUser = async () => {
            try {
                const user_profile = await axios.post( `${baseUrl}/user/${user?.ref_id}`, { ismentor: user?.ismentor },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                    },
                    withCredentials: true,
                    cancelToken: source.token
                } )

                // console.log("user prof: ", user_profile.data.mentor.mentee);

                if( user_profile.data.ismentor ) {
                    // console.log("filter accepted: ", user_profile.data.mentor.mentee.filter( i => i.status.mode === "pending"));
                    setMenteeList(user_profile.data.mentor.mentee.filter( i => i.status.mode === "accepted"));
                    setPendingList(user_profile.data.mentor.mentee.filter( i => i.status.mode === "pending"))
                    setAppointments(user_profile.data.mentor.mentee.filter( i => i.schedule.length !== 0 && i.status.mode === "accepted") );
                    setScheduleList(user_profile.data.mentor.mentee.map( i => i.schedule.filter( s => s._id ) ).flat())
                } else {
                    // mentee profile dashboard
                    // console.log("mentor: ", user_profile.data.mentee.map( i => ({ ...i, mentee: i.mentee.filter( data => data. )})))
                    // console.log("get: ", user_profile.data.mentee.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user.ref_id ) }) ).sort( (a,b) => Number(a.map( mentee => mentee.map( sched => sched.map( i => i._id.approved ) ) )) - Number(b.map( mentee => mentee.map( sched => sched.map( i => i._id.approved ) ) )) ) );
                    setMentor(user_profile.data.mentee);
                    setAppointments(user_profile.data.mentee.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user.ref_id && data.status.mode === "accepted" ) }) ));
                    setMenteeSched(user_profile.data.mentee.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user.ref_id && data.status.mode === "accepted" ).map( a => ({ ...a, schedule: a.schedule.filter( sched => sched._id.approved === false ) })) }) ));
                }
            } catch (error) {
                console.log(error);
                // alert(`Internal server error: ${error}`);
            } finally {
                setLoading(false);
            }
        }
        
        getUser();
        
        return () => {
            source.cancel("getting info cancelled");
        }
    }, [user])

    // console.log("appoi: ",appointments );
    // console.log("mentee sched: ",menteeSched )
    // console.log("get sched only: ", menteeList.map( i => i.schedule.filter( s => s._id ) ).flat() );

    const handleMentorSchedule = async () => {

        // handle schedule over
        if( setTo !== "" && from !== null && to !== null ) { // if all have values

            // if( from === to ) { // check if the datetime is the same

            // }

            // overlap means that mentor have same datetime start schedule
            // let overlap = scheduleList.some( i => { 
            //     return i._id.from === from;
            // })
            console.log("map: ", menteeList );
            if ( menteeList.map( i => i.schedule.map( s => s._id ).some( i => {
                return moment(from).isBetween(moment(i.from),moment(i.to)) ;
            }) )[0] ) {
                console.log("Schedule overlapped!");    
                setOpen(true)

            } else {
                console.log("Schedule not overlapped!", menteeList);
                await saveSchedule();

                // await saveSchedule();
            }
            
            // if(overlap) {
            //     // alert("Your schedule is overlapped");
                // setOpen(true)
            // }
        }

    }

    const saveSchedule = async () => {
         try {
                const sched = await axios.post(`${baseUrl}/mentor/schedule`, { 
                    from, 
                    to, 
                    email: setTo
                }, { 
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                    },
                    withCredentials: true,
                })

                console.log(sched)
                window.location.reload()
            } catch (error) {
                console.log(error.response)
            }
    }

    return loading ? <Loading /> :  (    
        <React.Fragment>
            <Header title="Dashboard" />
            <AppbarSpace divider />

            <Container sx={{ mt: 5 }}>
                <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    gap={{ xs: 5, sm: 5, md: 2 }}
                    justifyContent="space-between"
                    alignItems={{ sm: "start", md: "center" }}
                >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                        <Avatar
                            src={user?.img}
                            alt={user?.firstname}
                            sx={{ width: 100, height: 100 }}
                        />

                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            gap={2}
                        >
                            <Box>
                                <Stack
                                    direction="row"
                                    gap={1}
                                    alignItems="start"
                                >
                                    <Typography variant="h4" fontWeight="bold" textTransform="capitalize" align="left">
                                        {user?.firstname} {user?.lastname}
                                    </Typography>
                                    
                                </Stack>

                                <Typography variant="inherit" fontWeight={300} sx={{ opacity: 0.8 }}>
                                    {user?.profession}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>

                    {/* <Box>
                        <IconButton onClick={ () => navigate(`/chat/${user?.ref_id}`)} size="large" >
                            <ChatIcon color="primary" fontSize="large" />
                        </IconButton>
                    </Box> */}
                </Stack>
            </Container>

            <Box bgcolor="#f2f4fb" mt={2} pb={10} height={ ["menteeList"]?.length !== 0 ? "100%": "100vh"}>
                <Container sx={{ pt: 5, pb: 5 }}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        gap={5}
                        divider={
                            <Divider
                                orientation="vertical"
                                flexItem
                                variant="middle"
                            />
                        }
                    >
                        <Section title="Appointments" subtitle="Schedule's Lists">
                            <Stack direction="column" gap={2}>

                                {user?.ismentor ? <MentorAppointment appointment={appointments} /> : <MenteeAppointment appointment={appointments} user={user} /> }
            
                            </Stack>
                        </Section>
                        
                        {user?.ismentor ? <MentorSchedule setTo={setTo} setSetTo={setSetTo} menteeList={menteeList} from={from} setFrom={setFrom} to={to} setToEnd={setToEnd} handleMentorSchedule={handleMentorSchedule} /> : <MenteeSchedule appointments={appointments} menteeSched={menteeSched} />}
                        
                        
                    </Stack>

                    <Divider sx={{ mt: 8, mb: 8 }} variant="middle" />

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        gap={5}
                        divider={
                            <Divider
                                orientation="vertical"
                                flexItem
                                variant="middle"
                            />
                        }
                    >

                        { user?.ismentor ? <MenteeList mentee={menteeList} /> : <MentorList mentor={mentor} user={user} />}
                        
                        {/* {user?.ismentor && <SendEmail user={user} menteeList={menteeList} />} */}
                        { user?.ismentor ? <PendingMentees pendingList={pendingList} /> : <AppliedMentors mentor={mentor} user={user} /> }
                    </Stack>
                    
                </Container>
            </Box>
            
            <Dialog
                open={open}
                // onClose={ () => setOpen(false) }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                
            >
                <DialogTitle id="alert-dialog-title">
                    Your schedule is overlapped!
                </DialogTitle>
                <DialogContent dividers >
                    <DialogContentText id="alert-dialog-description">
                        The schedule you wish to create overlaps your current schedules. Please pick another date and time 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="info" onClick={ () => setOpen(false) }>Okay</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </React.Fragment>
    );
};

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
                    {/* <DialogContentText id="alert-dialog-description">
                        This message will be sent to {rejectData._id.firstname}.
                    </DialogContentText>
                    <TextField 
                        placeholder="Tell why you rejected the enrollment..."
                        size="small"
                        multiline
                        minRows={3}
                        fullWidth
                        sx={{ mt: 2 }}
                    /> */}
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


const SendEmail = ({ user, menteeList }) => {
    const [sendTo, setSendTo] = useState([]);
    const [msg, setMsg] = useState("");
    const [sending, setSending] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [alertMsg, setAlertMsg] = useState("")

    const handleChange = e => {
        setSendTo(
            typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
        )
    }

    const handleSendEmail = async () => {
        setSending(true);

        try {
            // from, to, mentor
            const res = await axios.post(`${baseUrl}/email`, {
                from: user?.email,
                to: sendTo,
                mentor: `${user?.firstname} ${user?.lastname}`,
                text: msg
            })

            console.log(res.data);
            setAlertMsg(res.data.msg);
            setOpenSnack(true)
        } catch (error) {
            console.error(error);
            setAlertMsg(error.response.data.msg);
        } finally {
            setSending(false);
        }
    }

    return (
        <React.Fragment>
            <Section title="Compose an Email" subtitle="Mentee Email" >
                <Select  
                    value={sendTo}
                    size="small"
                    displayEmpty
                    multiple
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select an email you wish to send</em>;
                        }
                        return (
                            <Stack display="column" gap={1} >
                                { selected.map( value => (
                                    <Chip key={value} label={value} color="primary" sx={{ fontSize: 15 }} />
                                )) }
                            </Stack>
                        );
                    }}
                    onChange={handleChange}
                    sx={{ mb: 3 }} 
                >
                    {menteeList?.map( (i, index) => (
                        <MenuItem key={index} value={i?._id?.email} >{i?._id?.email}</MenuItem>
                    ))}
                </Select>

                <Box>
                    <TextField 
                        fullWidth
                        multiline
                        minRows={4}
                        sx={{ whiteSpace: "pre-wrap" }}
                        value={msg}
                        onChange={ e => setMsg(e.target.value)}
                        placeholder="Compose an email..."
                    />
                </Box>

                <Box mt={2} textAlign="right" >
                    <LoadingButton 
                        variant="contained"
                        endIcon={<SendRoundedIcon />}
                        loading={sending}   
                        loadingPosition="end"
                        onClick={handleSendEmail}
                    >
                        Send
                    </LoadingButton>
                </Box>
            </Section>

            <Snackbar 
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={ () => setOpenSnack(false)}
            >
                <Alert variant="filled" onClose={ () => setOpenSnack(false)} severity="success" sx={{ width: '100%' }} >
                    {alertMsg}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}


const MenteeAppointment = ({ appointment, user }) => {
    const [openRating, setOpenRating] = useState(false);
    const [rate, setRate] = useState(0);
    const [schedId, setSchedId] = useState(null);
    const [mentorId, setMentorId] = useState(null);

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
    console.log("app: ", appointment);
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
                                <Box sx={{ mt: 2 }} width="100%">
                                    <Button variant="contained" color="success" fullWidth onClick={() => handleRate({ sched_id: sched?._id?._id, mentor_id: i?._id?._id }) }>Rate</Button>
                                </Box>} 
                                
                                {sched?._id?.rating?.rated && <Typography align="right" pt={2}>Rate Submitted!</Typography>}
                            </Paper>
                        </React.Fragment>
                    ) )}
                </React.Fragment>
            ) ) }

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
        
                                            const res = await axios.get(`${baseUrl}/mentor/schedule/cancel/${ sched?._id?._id }`);
        
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

                                    const res = await axios.get(`${baseUrl}/mentor/schedule/done/${ sched?._id?._id }`);

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

const MentorSchedule = ({ setTo, setSetTo, menteeList, from, setFrom, to, setToEnd, handleMentorSchedule }) => {
    const [loading, setLoading] = useState(false);

    const handleSetDate = (e) => {
        // setLoading(true)
        e.preventDefault();
        handleMentorSchedule()
    }

    return (
            <Section title="Schedule" subtitle="Set Schedule">
                <Typography>Mentee Email</Typography>
                <Select 
                    value={setTo} 
                    onChange={ e => setSetTo(e.target.value)}
                    sx={{ mb: 3 }} 
                    size="small"
                    // renderValue={ (selected) => {
                    //     if (selected) {
                    //         return <em>Select an email you wish to send</em>;
                    //     }
                    //     console.log("selected:", selected)

                    //     return selected;
                    // }}
                >
                    {menteeList?.map( (i, index) => (
                        <MenuItem key={index} value={i?._id?.email} >{i?._id?.email}</MenuItem>
                    ))}
                </Select>

                <Stack component="form" onSubmit={handleSetDate} gap={1} direction="column">
                    <Typography>Start: </Typography>
                    <TextField 
                        type="datetime-local"
                        value={from === null ? "" : from}
                        onChange={ (e) => {
                            setFrom(e.target.value);
                        }}
                        inputProps={{ min: moment().format("YYYY-MM-DD[T]HH:mm") }}
                        size="small"
                        required
                    />
                    <Typography>End: </Typography>
                    <TextField 
                        type="datetime-local"
                        disabled={from === null && true}
                        value={to === null ? "" : to}
                        onChange={ (e) => {
                            setToEnd(e.target.value);

                        }}
                        inputProps={{ min: moment(from).add(1, "minutes").format("YYYY-MM-DD[T]HH:mm") }}
                        size="small"
                        required
                    />
                    <LoadingButton type="submit" loading={loading} variant="contained" >Set Date</LoadingButton>
                </Stack>
            </Section>
    )
}

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
                <Stack  sx={{ mt: 2 }} gap={5}>
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

const Section = ({ title, subtitle, children }) => {
    return (
        <Box width="100%" >
            <Typography variant="h5" fontWeight="bold" mb={1} >
                {title}
            </Typography>

            <Divider />

            <Box maxHeight="800px" overflow="auto" p={1} > 
                <Typography variant="h6" fontWeight={500} mb={1} mt={5}>
                    {subtitle}
                </Typography>
                {children}
            </Box>

        </Box>
    );
};



export default UserProfile;
