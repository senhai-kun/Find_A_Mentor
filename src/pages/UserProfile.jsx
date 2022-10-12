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
    const [date, setDate] = useState(null);
    const [mentor, setMentor] = useState([])
    const [menteeList, setMenteeList] = useState([]);
    const [setTo, setSetTo] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [menteeSched, setMenteeSched] = useState([]);
    
    const [from, setFrom] = useState(null);
    const [to, setToEnd] = useState(null)

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
                    setMenteeList(user_profile.data.mentor.mentee);
                    setAppointments(user_profile.data.mentor.mentee.filter( i => i.schedule.length !== 0 ) );
                } else {
                    // mentee profile dashboard
                    // console.log("get: ", user_profile.data.mentee.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user.ref_id ) }) ).sort( (a,b) => Number(a.map( mentee => mentee.map( sched => sched.map( i => i._id.approved ) ) )) - Number(b.map( mentee => mentee.map( sched => sched.map( i => i._id.approved ) ) )) ) );
                    setMentor(user_profile.data.mentee);
                    setAppointments(user_profile.data.mentee.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user.ref_id ) }) ));
                    setMenteeSched(user_profile.data.mentee.map( i => ({ ...i, mentee: i.mentee.filter( data => data._id.ref_id === user.ref_id ).map( a => ({ ...a, schedule: a.schedule.filter( sched => sched._id.approved === false ) })) }) ));

                }
                

            } catch (error) {
                console.log(error)
            }
        }
        
        getUser();
        
        return () => {
            source.cancel();
        }
    }, [user])

    console.log("appoi: ",appointments );
    console.log("mentee sched: ",menteeSched )

    const handleMentorSchedule = async () => {

        if( setTo !== "" && from !== null && to !== null ) {
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

    }

    return (    
        <React.Fragment>
            <Header title="Dashboard" />
            <AppbarSpace divider />

            <Container sx={{ mt: 5 }}>
                <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    gap={{ xs: 5, sm: 5, md: 2 }}
                    justifyContent="space-between"
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
                        <Section title="Appointments" subtitle="Today">
                            <Stack direction="column" gap={2}>

                                {user?.ismentor ? <MentorAppointment appointment={appointments} /> : <MenteeAppointment appointment={appointments} user={user} /> }
                    
                                
                            </Stack>
                        </Section>
                        
                        {user?.ismentor ? <MentorSchedule setTo={setTo} setSetTo={setSetTo} menteeList={menteeList} from={from} setFrom={setFrom} to={to} setToEnd={setToEnd} handleMentorSchedule={handleMentorSchedule} /> : <MenteeSchedule appointments={appointments} menteeSched={menteeSched} />}
                        
                        
                    </Stack>
                    
                    { user?.ismentor ? <MenteeList mentee={menteeList} /> : <MentorList mentor={mentor} />}
                </Container>
            </Box>

            <Footer />
        </React.Fragment>
    );
};

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

    return appointment.map( (i,index) => (
        // parent object mentor data
        <React.Fragment key={index}> 
            {i?.mentee?.map( mentee => (
                // child mentee list
                <React.Fragment key={mentee._id._id}>
                    {mentee?.schedule?.map( sched => (
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
                                        <Typography
                                            fontWeight="bold"
                                            color="inherit"
                                            textTransform="capitalize"
                                            variant="h6"
                                        >
                                            {i?._id?.firstname} {i?._id?.lastname}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight={300}
                                        >
                                            {i?._id?.email}
                                        </Typography>

                                        <Stack sx={{ mt: 2 }}>
                                            <Typography 
                                                variant="body2"
                                                fontWeight={300}
                                            >
                                                Start: {moment(sched?._id?.from).format('lll')}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                fontWeight={300}
                                            >
                                                End: {moment(sched?._id?.to).format('lll')}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                    <Box>
                                        <Typography>
                                            {sched?._id?.approved ? "Approved" : "Pending"}
                                        </Typography>
                                    </Box>
                                </Stack>
                                
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

    return appointment.map( (mentee) => (
        <Box mb={2} key={mentee?._id?._id}>
            <Typography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h5"
                align="center"
            >
                {mentee?._id?.firstname} {mentee?._id?.lastname}
            </Typography>
            { mentee.schedule.map( sched => (
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
                                <Typography
                                    fontWeight="bold"
                                    color="inherit"
                                    textTransform="capitalize"
                                    variant="h6"
                                >
                                    {mentee?._id?.firstname} {mentee?._id?.lastname}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                >
                                    {mentee?._id?.email}
                                </Typography>

                                <Stack sx={{ mt: 2 }}>
                                    <Typography 
                                        variant="body2"
                                        fontWeight={300}
                                    >
                                        Start: {moment(sched?._id?.from).format('lll')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight={300}
                                    >
                                        End: {moment(sched?._id?.to).format('lll')}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <Typography>
                                    {sched?._id?.approved ? "Approved" : "Pending"}
                                </Typography>
                            </Box>
                        </Stack>
                        
                        {sched?._id?.approved && moment(sched?._id?.to).isBefore() && 
                        <Box sx={{ pt: 2 }}>
                            <Typography>
                                Status: { sched?._id?.rated ? "Rated" : "Pending" }
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
                                    console.log(error)
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
                                {mentee?.schedule?.map( sched => (
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
                                                            Start: <Typography component="span" variant="body2" fontWeight={500}>{moment(sched?._id?.from).format('lll')}</Typography>
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            fontWeight={300}
                                                        >
                                                            End: <Typography component="span" variant="body2" fontWeight={500}>{moment(sched?._id?.to).format('lll')}</Typography>
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

    const handleSetDate = () => {
        setLoading(true)
        handleMentorSchedule()
    }

    return (
            <Section title="Schedule" subtitle="Set Schedule">
                <Typography>Mentee Email</Typography>
                <Select value={setTo} onChange={ e => setSetTo(e.target.value)} sx={{ mb: 3 }} size="small">
                    {menteeList?.map( (i, index) => (
                        <MenuItem key={index} value={i?._id?.email} >{i?._id?.email}</MenuItem>
                    ))}
                </Select>

                <Stack gap={1} direction="column">
                    <Typography>Start: </Typography>
                    <TextField 
                        type="datetime-local"
                        value={from === null ? "" : from}
                        onChange={ (e) => {
                            setFrom(e.target.value);
                        }}
                        inputProps={{ min: moment().format("YYYY-MM-DD[T]HH:mm") }}
                        size="small"
                    />
                    <Typography>End: </Typography>
                    <TextField 
                        type="datetime-local"
                        value={to === null ? "" : to}
                        onChange={ (e) => {
                            setToEnd(e.target.value);

                        }}
                        inputProps={{ min: moment().format("YYYY-MM-DD[T]HH:mm") }}
                        size="small"
                    />
                    <LoadingButton loading={loading} variant="contained" onClick={handleSetDate}>Set Date</LoadingButton>
                </Stack>
            </Section>
    )
}

const MenteeList = ({mentee}) => {
    return (
        <Box sx={{ mt: 5 }} >
            <Section title="Mentees" subtitle="Lists of your Mentees.">

            <Stack  sx={{ mt: 2 }} direction="row" gap={5}>
                {mentee?.map( (i, index) => (
                        <Box key={index}>
                            <Avatar 
                                src={i?._id?.img} 
                                alt={i?._id?.ref_id}  
                                variant="rounded"
                                sx={{
                                    height: 200,
                                    width: "100%"
                                }}
                            />
                            <Typography  textTransform="capitalize" align="center" >{i?._id?.firstname} {i?._id?.lastname}</Typography>
                            <Typography fontWeight={300} >{i?._id?.email}</Typography>
                        </Box>
                ))}
            </Stack>

            </Section>
        </Box>
    )
}

const MentorList = ({mentor}) => {
    return (
        <Box sx={{ mt: 5, mb: 5 }} >
            <Section title="Mentors" subtitle="Lists of your Mentors.">
                {console.log("mentopr: ", mentor)}
                <Stack  sx={{ mt: 2 }} direction="row" gap={5}>
                    {mentor?.map( (i, index) => (
                        <Box key={index}>
                            <Avatar 
                                src={i?._id?.img} 
                                alt={i?._id?.ref_id}  
                                variant="rounded"
                                sx={{
                                    height: 200,
                                    width: "100%"
                                }}
                            />
                            <Typography  textTransform="capitalize" align="center" >{i?._id?.firstname} {i?._id?.lastname}</Typography>
                            <Typography fontWeight={300} >{i?._id?.email}</Typography>
                        </Box>
                    ))}
                </Stack>
            </Section>
        </Box>
    )
}

const Section = ({ title, subtitle, children }) => {
    return (
        <Box width="100%">
            <Typography variant="h5" fontWeight="bold" mb={1} >
                {title}
            </Typography>

            <Divider />

            <Typography variant="h6" fontWeight={500} mb={1} mt={5}>
                {subtitle}
            </Typography>
            {children}
        </Box>
    );
};

const LinkTab = ({ ...props }) => {
    return (
        <Tab
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
            disableRipple
            disableFocusRipple
            sx={{
                color: "#172E59",
                fontSize: "inherit",
                borderRight: 1,
                borderColor: "divider",
            }}
        />
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

// const UserTab = () => {
//     const [tab, setTab] = useState(0);

//     const handleChange = (event, newValue) => {
//         setTab(newValue);
//     };
//     return (
//         <Stack mb={5} width="100%">
//             <Tabs
//                 value={tab}
//                 onChange={handleChange}
//                 textColor="primary"
//                 TabIndicatorProps={{
//                     style: { backgroundColor: "inherit", color: "red" },
//                 }}
//             >
//                 <LinkTab label="Page One" href="/drafts" />
//                 <LinkTab label="Page Two" href="/trash" />
//                 <LinkTab label="Page Three" href="/spam" />
//             </Tabs>

//             <TabPanel value={tab} index={0}>
//                 one
//             </TabPanel>
//             <TabPanel value={tab} index={1}>
//                 2
//             </TabPanel>
//             <TabPanel value={tab} index={2}>
//                 3
//             </TabPanel>
//         </Stack>
//     );
// };

export default UserProfile;
