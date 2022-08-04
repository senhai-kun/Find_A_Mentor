import React, { useState } from "react";
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
import AppbarSpace from "../utils/AppbarSpace";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/slicer/authSlice";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

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

const ApplyModal = ({ open, close }) => {

    return (
        <div>
            <Dialog open={open} >
                <DialogTitle id="responsive-dialog-title">
                    Apply as Monica's Mentee
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="inherit" autoFocus onClick={close}>
                        Close
                    </Button>
                    <Button variant="contained" autoFocus onClick={close} >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const MentorProfile = () => {
    const userLoggedIn = useSelector(isLoggedIn);
    const navigate = useNavigate();
    const [ apply, setApply ] = useState(false);

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

    return (
        <React.Fragment>
            <Header title="Monica Badiu" />
            <AppbarSpace divider />

            <ApplyModal open={apply} close={handleCloseApply} />
            <Container sx={{ mt: 10 }}>
                <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    gap={{ xs: 5, sm: 5, md: 2 }}
                    justifyContent="space-between"
                >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                        <Avatar
                            src="https://cdn.mentorcruise.com/cache/f2dd6a7a12e4f3903dc1c9b9cea331e3/0fc92fa3aea69827/53dd96af93a989e04300c14eb9695c9c.jpg"
                            alt="Monica Badiu"
                            sx={{ width: 170, height: 200, borderRadius: 8 }}
                            variant="rounded"
                        />

                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            gap={5}
                        >
                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    Monica Badiu
                                </Typography>
                                <Typography variant="inherit" fontWeight={300}>
                                    Conversion Copywriter & Marketing consultant
                                </Typography>
                                <Chip
                                    icon={<VerifiedIcon />}
                                    label="Verified Mentor"
                                    sx={{ mt: 1 }}
                                    color="success"
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>

                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                <Stack gap={1}>
                                    <Details
                                        label="Manila, PH"
                                        icon={
                                            <LocationOnOutlinedIcon color="info" />
                                        }
                                    />
                                    <Details
                                        label="0999 798 2135"
                                        icon={
                                            <LocalPhoneOutlinedIcon color="info" />
                                        }
                                    />
                                </Stack>
                                <Details
                                    label="monicabadiu@gmail.com"
                                    icon={
                                        <MailOutlineOutlinedIcon color="info" />
                                    }
                                />
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
                        >
                            { userLoggedIn ? "Apply as Mentee" : "Login to Apply!" }
                        </Button>

                        <Typography variant="h6" align="center" mt={1}>
                            Only
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                component="span"
                            >
                                {" "}
                                ₱250 /month
                            </Typography>
                        </Typography>
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
                            <Section title="Location">
                                <Box
                                    style={{ width: "100%", height: 400 }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {userLoggedIn ? (
                                        <Location />
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

                        <Box width="100%">
                            <Section title="About">
                                <Typography paragraph fontWeight={300}>
                                    I help business owners find their growth
                                    formula so they can have the growth and
                                    visibility they dream of. I specialize in
                                    business growth, copywriting, marketing, and
                                    brand storytelling for entrepreneurs who
                                    want to take control of their own lives and
                                    build a legacy that will last long after
                                    they are gone. I am a mom-in-training with
                                    an insatiable curiosity for paper art,
                                    psychology, and all things marketing!
                                </Typography>
                            </Section>
                        </Box>

                        <Box width="100%">
                            <Section title="Skills">
                                <Stack direction="row" gap={2} flexWrap="wrap">
                                    {[
                                        "Email Marketing",
                                        "Seo for content",
                                        "Content marketing",
                                        "Sales copywriting",
                                    ].map((i, e) => (
                                        <Chip
                                            key={e}
                                            label={i}
                                            color="primary"
                                            onClick={() => console.log("asd")}
                                        />
                                    ))}
                                </Stack>
                            </Section>

                            <Section title="Social Links">
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
                            </Section>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </React.Fragment>
    );
};

const Section = ({ title, children }) => {
    return (
        <Box width="100%" mb={5}>
            <Typography variant="h6" fontWeight={500} mb={3}>
                {title}
            </Typography>
            {children}
        </Box>
    );
};

// f2f4fb
// acd2ec
export default MentorProfile;
