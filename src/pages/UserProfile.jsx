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
import { useNavigate } from "react-router-dom";
import Loading from "../reusable/Loading";
import MenteeAppointment from "../components/Dashboard/mentee/MenteeAppointment";
import Section from "../reusable/Section";
import MenteeSchedule from "../components/Dashboard/mentee/MenteeSchedule";
import MentorList from "../components/Dashboard/mentee/MentorList";
import AppliedMentors from "../components/Dashboard/mentee/AppliedMentors";
import PendingMentees from "../components/Dashboard/mentor/PendingMentees";
import SendEmail from "../components/Dashboard/mentor/SendEmail";
import MentorAppointment from "../components/Dashboard/mentor/MentorAppointment";
import MentorSchedule from "../components/Dashboard/mentor/MentorSchedule";
import MenteeList from "../components/Dashboard/mentor/MenteeList";

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

    const handleMentorSchedule = async () => {

        // handle schedule over
        if( setTo !== "" && from !== null && to !== null ) { // if all have values

            if ( menteeList.map( i => i.schedule.map( s => s._id ).some( i => {
                return moment(from).isBetween(moment(i.from),moment(i.to)) ;
            }) )[0] ) {
                console.log("Schedule overlapped!");    
                setOpen(true)

            } else {
                console.log("Schedule not overlapped!");
                await saveSchedule();
            }
            

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
                        
                        { user?.ismentor ? <PendingMentees pendingList={pendingList} /> : <AppliedMentors mentor={mentor} user={user} /> }
                    </Stack>
                    
                    <Box mt={5} >
                        {user?.ismentor && <SendEmail user={user} menteeList={menteeList} />}
                    </Box>
                    
                    
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


export default UserProfile;
