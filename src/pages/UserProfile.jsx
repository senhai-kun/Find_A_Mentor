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

        const getUser = async () => {
            try {
                const user_profile = await axios.post( `${baseUrl}/user/${user?.ref_id}`, { ismentor: user?.ismentor },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                    },
                    withCredentials: true,
                } )

                setMenteeList(user_profile.data.mentor.mentee)

            } catch (error) {
                console.log(error.response)
            }
                    
        }
        
        getUser();
        
    }, [])

    useEffect( () => {

        const getSchedule = async () => {
            try {
                
                const sched = await axios.get(`${baseUrl}/mentor/schedule/list`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                    },
                    withCredentials: true,
                });

                console.log(sched)

                if(user?.ismentor) {
                    setAppointments(sched.data.mentee);

                } else {
                    console.log("sched: ", sched.data.mentee.filter( i => i.schedule.approved === true ) )
                    setAppointments(sched.data.mentee.filter( i => i.schedule.approved === true ));
                    setMenteeSched(sched.data.mentee.filter( i => i.schedule.approved === false ))
                }

                setMentor(sched.data._id)

            } catch (error) {
                console.log(error.response.data)
            }
        }

        getSchedule();

    }, [] )

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
                            sx={{ width: 63, height: 63 }}
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

            <Box bgcolor="#f2f4fb" mt={2} pb={10} height="100vh">
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
                                {appointments?.map( (i,index) => (
                                    <Box width="100%" key={index}>
                                        <Divider>
                                            <Typography
                                                variant="body2"
                                                fontWeight={300}
                                                p={1}
                                            >
                                                Date: {moment(i?.schedule?.from).format('ll')}
                                            </Typography>
                                        </Divider>

                                        <Paper
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    alpha(
                                                        theme.palette.info
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
                                                    <Typography
                                                        fontWeight="bold"
                                                        color="inherit"
                                                        textTransform="capitalize"
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
                                                            Start: {moment(i?.schedule?.from).format('lll')}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            fontWeight={300}
                                                        >
                                                            End: {moment(i?.schedule?.to).format('lll')}
                                                        </Typography>
                                                    </Stack>
                                                </Box>
                                                <Box>
                                                    <Typography>
                                                        {i?.schedule?.approved ? "Approved" : "Pending"}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Paper>

                                    </Box>
                                ) )}
                                
                            </Stack>
                        </Section>
                        
                        {user?.ismentor && <MentorSchedule setTo={setTo} setSetTo={setSetTo} menteeList={menteeList} from={from} setFrom={setFrom} to={to} setToEnd={setToEnd} handleMentorSchedule={handleMentorSchedule} />}
                        
                        <MenteeSchedule appointments={appointments} menteeSched={menteeSched} />
                    </Stack>
                    
                    { user?.ismentor && <MenteeList mentee={menteeList} />}
                </Container>
            </Box>

            <Footer />
        </React.Fragment>
    );
};

const MenteeSchedule = ({ menteeSched }) => {
    
    return (
        <Section title="Schedule" subtitle="Pending Schedule">
            { menteeSched?.map( (i, index) => (
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
                key={index}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    gap={1}
                    alignItems="center"
                >
                    <Box>
                        <Typography color="inherit" fontWeight="bold" textTransform="capitalize" >{i?._id?.firstname} {i?._id?.lastname}</Typography>
                        <Typography variant="body2" fontWeight={300}>{i?._id?.email}</Typography>
                    </Box>

                    <Box>
                        <IconButton>
                            <DoneOutlineRoundedIcon onClick={ async () => { 
                                try {
                                    const res = await axios.post(`${baseUrl}/mentee/schedule/approved`, {sched_id: i?.schedule?._id} , {
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
                            } } />
                        </IconButton>
                    </Box>
                </Stack>
               
            </Paper>))}
        </Section>
    )
}

const MentorSchedule = ({ setTo, setSetTo, menteeList, from, setFrom, to, setToEnd, handleMentorSchedule }) => {

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
                        size="small"
                    />
                    <Typography>End: </Typography>
                    <TextField 
                        type="datetime-local"
                        value={to === null ? "" : to}
                        onChange={ (e) => {
                            setToEnd(e.target.value);

                        }}
                        size="small"
                    />
                    <Button variant="contained" onClick={handleMentorSchedule}>Set Date</Button>
                </Stack>
            </Section>
    )
}

const MenteeList = ({mentee}) => {
    return (
        <Box sx={{ mt: 5 }} >
            <Section title="Mentees" subtitle="Lists of your Mentees.">

                {mentee?.map( (i, index) => (
                    <Stack key={index} sx={{ mt: 2 }} direction="row">
                        <Box textAlign="center">
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
                    </Stack>
                ))}

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
