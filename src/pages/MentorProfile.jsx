import React, { useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import VerifiedIcon from "@mui/icons-material/Verified";
import Footer from "../components/Footer";
import Location from "../components/map/Location";
import AppbarSpace from "../reusable/AppbarSpace";
import { useSelector } from "react-redux";
import { isLoading, isLoggedIn } from "../redux/slicer/authSlice";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import baseUrl from "../utils/baseUrl";
import { userData } from "../redux/slicer/userSlice";

const Details = ({ icon, label, variant }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="end">
            <Chip
                label={label}
                icon={icon}
                onClick={() => console.log("asd")}
                variant="outlined"
                color="primary"
                sx={{ border: "none" }}
            />
        </Stack>
    );
};

const EnrollModal = ({ open, close, ref_id, mentor  }) => {

    const handleEnroll = async () => {
        try {
            const res = await axios.post(`${baseUrl}/mentee/enroll`, {
                ref_id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                },
                withCredentials: true,
            });

            if( res.data.success ) window.location.reload();
            
        } catch (error) {
            console.log(error.response);

            alert(`Error Message: ${error.response.data.msg}`)
        } finally {
            close();
        }
    }

    return (
        <div>
            <Dialog open={open} >
                <DialogTitle sx={{ textTransform: "capitalize" }}>
                    Enroll to {mentor.firstname} {mentor.lastname}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By Enrolling as <Typography component="span" textTransform="capitalize" color="inherit">{mentor.firstname}'s</Typography> Mentee you must agree to their terms and agreement.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="inherit" autoFocus onClick={close}>
                        Close
                    </Button>
                    <Button variant="contained" autoFocus onClick={handleEnroll} >
                        Enroll
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const MentorProfile = () => {
    const userLoggedIn = useSelector(isLoggedIn);
    const loading = useSelector(isLoading);
    const user = useSelector(userData);

    const navigate = useNavigate();
    const location = useLocation();
    const ref_id = location.pathname.split("/")[3];
    const [apply, setApply] = useState(false);
    const [mentor, setMentor] = useState({});

    const [enrolled, setEnrolled] = useState(false);

    const fetchMentor = async () => {
        try {
            const res = await axios.get(`${baseUrl}/mentor/${ref_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                },
                withCredentials: true,
            })

            console.log("mentor: ", res.data.mentor);
            setMentor(res.data.mentor);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchMentor();

        if( userLoggedIn ) {
            if( !user?.ismentor ) {
                console.log("asd");
                checkIfEnrolled();
            }

        } else {
            console.log("loggedout");
        }


    }, [loading]);

    
    const checkIfEnrolled = async () => {
        console.log("check")
        try {
            const mentee = await axios.get(`${baseUrl}/mentee/${user?.ref_id}/mentor/${ref_id}/enrolled`);

            console.log(mentee.data);

            setEnrolled(mentee.data.enrolled);
            
        } catch (error) {
            console.log(error);
        }
    }


    const handleApply = () => {
        if ( !userLoggedIn ) {
            navigate("/account/login")
        } else {
            setApply(true);
        }
    }

    const handleCloseApply = () => {
        setApply(false);
    }

    console.log("enroll: ",  enrolled)

    return (
        <React.Fragment>
            <Header title={`${mentor?.firstname} ${mentor?.lastname}`} />
            <AppbarSpace divider />

            <EnrollModal open={apply} close={handleCloseApply} ref_id={ref_id} mentor={mentor} />
            <Container sx={{ mt: 8 }}>
                <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    gap={{ xs: 5, sm: 5, md: 2 }}
                    justifyContent="space-between"
                >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                        <Avatar
                            src={mentor?.img}
                            alt={mentor?.firstname}
                            sx={{ width: 170, height: 200, borderRadius: 8 }}
                            variant="rounded"
                        />

                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            gap={5}
                        >
                            <Box>
                                <Typography variant="h4" fontWeight="bold" textTransform="capitalize">
                                    {mentor?.firstname} {mentor?.lastname}
                                </Typography>
                                <Typography variant="inherit" fontWeight={300}>
                                    {mentor?.profession}
                                </Typography>
                                {/* <Chip
                                    icon={<VerifiedIcon />}
                                    label="Verified Mentor"
                                    sx={{ mt: 1 }}
                                    color="success"
                                    size="small"
                                    variant="outlined"
                                /> */}
                            </Box>

                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                <Stack gap={1}>
                                    { mentor?.coordinates?.address && <Details
                                        label={mentor?.coordinates?.address}
                                        icon={
                                            <LocationOnOutlinedIcon color="info" />
                                        }
                                    />}
                                    <Details
                                        label={mentor?.email}
                                        icon={
                                            <MailOutlineOutlinedIcon color="info" />
                                        }
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Box>
                        <Button
                            variant="contained"
                            color="warning"
                            fullWidth
                            size="large"
                            onClick={handleApply}
                            disabled={ !user?.ismentor ? enrolled ? true : false : true }
                        >
                            { userLoggedIn ? user?.ismentor ? "Cannot enroll as Mentor" : enrolled ? "Enrolled" : "Enroll as Mentee" : "Login to Apply!" }
                        </Button>

                        {/* <Typography variant="h6" align="center" mt={1}>
                            Only
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                component="span"
                            >
                                {" "}
                                ₱250 /month
                            </Typography>
                        </Typography> */}
                    </Box>
                </Stack>
            </Container>

            

            <Box bgcolor="#f2f4fb" mt={2} pb={10}>
                <Container sx={{ pt: 5 }}>

                    <Stack
                        direction={{ xs: "column", sm: "column", md: "row" }}
                        gap={5}
                        justifyContent="space-between"
                    >
                        <Box width="100%">
                            <Section title="Skills">
                                <Stack direction="row" gap={2} flexWrap="wrap">
                                    {mentor?.details?.skills.map((i, e) => (
                                        <React.Fragment key={e}>
                                            {/* <Chip
                                                label={i}
                                                color="primary"
                                                onClick={() => console.log("asd")}
                                            /> */}
                                            <Typography sx={{ borderRadius: 6, p: 1, pr: 2, pl: 2, border: "1px solid black" }} variant="button" >{i}</Typography>
                                        </React.Fragment>
                                    ))}
                                </Stack>
                            </Section>

                            {/* <Section title="Social Links">
                                <Stack direction="column" gap={1}>
                                    <Details
                                        icon={<FacebookIcon color="info" />}
                                        label="monica_badiu"
                                    />
                                    <Details
                                        icon={<InstagramIcon color="info" />}
                                        label="_badiumonica"
                                    />
                                    <Details
                                        icon={<TwitterIcon color="info" />}
                                        label="badiumonica_"
                                    />
                                    <Details
                                        icon={<LinkedInIcon color="info" />}
                                        label="monica_badiu"
                                    />
                                </Stack>
                            </Section> */}
                        </Box>

                        <Box width="100%">
                            <Section title="Location">
                                <Box
                                    style={{ width: "100%", height: 400 }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {userLoggedIn ? (
                                        <>
                                            {mentor.coordinates && <Location userCoordinates={user?.coordinates} mentorCoordinates={mentor?.coordinates} />}
                                        </>
                                    ) : (
                                        <Box>
                                            <Typography
                                                variant="inherit"
                                                fontWeight={300}
                                                color="error"
                                            >
                                                Login Required!
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Section>
                        </Box>        

                    </Stack>
                    
                    <Box width="100%">
                            <Section title="About">
                                <Typography 
                                    paragraph 
                                    fontWeight={300} 
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '20',
                                        WebkitBoxOrient: 'vertical',
                                        opacity: 0.9,
                                        fontWeight: 300,
                                        mt: 2,
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {mentor?.details?.about}

                                </Typography>
                                {/* <span>Read More...</span> */}

                            </Section>
                        </Box>       
                </Container>
            </Box>
            <Footer />
        </React.Fragment>
    );
};

const Section = ({ title, children }) => {
    return (
        <Box width="100%" mb={5}>
            <Typography variant="h4" fontWeight={600} mb={3}>
                {title}
            </Typography>
            {children}
        </Box>
    );
};

// f2f4fb
// acd2ec
export default MentorProfile;
