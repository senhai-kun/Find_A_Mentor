import React, { useState } from "react";
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
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import Footer from "../components/Footer";
import AppbarSpace from "../utils/AppbarSpace";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Header from "../components/Header";

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
                            src="https://cdn.mentorcruise.com/cache/f2dd6a7a12e4f3903dc1c9b9cea331e3/0fc92fa3aea69827/53dd96af93a989e04300c14eb9695c9c.jpg"
                            alt="Monica Badiu"
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
                                    <Typography variant="h5" fontWeight="bold">
                                        Monica Badiu
                                    </Typography>
                                    <Chip
                                        icon={<VerifiedIcon />}
                                        label="Verified Mentor"
                                        color="success"
                                        size="small"
                                        variant="outlined"
                                    />
                                </Stack>

                                <Typography variant="inherit" fontWeight={300}>
                                    Conversion Copywriter & Marketing consultant
                                </Typography>
                            </Box>
                            
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                <Details
                                    label="Manila, PH"
                                    icon={
                                        <LocationOnOutlinedIcon color="info" />
                                    }
                                    size="small"
                                    variant="outlined"
                                />
                                <Details
                                    label="0999 798 2135"
                                    icon={
                                        <LocalPhoneOutlinedIcon color="info" />
                                    }
                                    size="small"
                                    variant="outlined"
                                />
                                <Details
                                    label="monicabadiu@gmail.com"
                                    icon={
                                        <MailOutlineOutlinedIcon color="info" />
                                    }
                                    size="small"
                                    variant="outlined"
                                />
                            </Stack>
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
                        <Box width="100%">
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                Activity
                            </Typography>

                            <Divider />

                            <Activity />
                        </Box>

                        <Box width="100%">
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                Appointments
                            </Typography>

                            <Divider />

                            <Section title="Today">
                                <Stack direction="column" gap={2}>
                                    <Box width="100%">
                                        <Divider>
                                            <Typography
                                                variant="body2"
                                                fontWeight={300}
                                                p={1}
                                            >
                                                8:00am Meet Up
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
                                            >
                                                <Box>
                                                    <Typography
                                                        fontWeight="bold"
                                                        color="inherit"
                                                    >
                                                        Monica Badiu
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={300}
                                                    >
                                                        monicabadiu@gmail.com
                                                    </Typography>
                                                </Box>
                                                <IconButton>
                                                    <CloseRoundedIcon color="primary" />
                                                </IconButton>
                                            </Stack>
                                        </Paper>
                                    </Box>

                                    <Box width="100%">
                                        <Divider>
                                            <Typography
                                                variant="body2"
                                                fontWeight={300}
                                                p={1}
                                            >
                                                10:00pm Online
                                            </Typography>
                                        </Divider>
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
                                            >
                                                <Box>
                                                    <Typography
                                                        fontWeight="bold"
                                                        color="inherit"
                                                    >
                                                        Monica Badiu
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={300}
                                                    >
                                                        monicabadiu@gmail.com
                                                    </Typography>
                                                </Box>
                                                <IconButton>
                                                    <CloseRoundedIcon color="warning" />
                                                </IconButton>
                                            </Stack>
                                        </Paper>
                                    </Box>
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

const Activity = () => {
    return (
        <Section title="Log">
            <Stack gap={3}>
                <Stack
                    direction="row"
                    gap={2}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Avatar sx={{ width: 50, height: 50, bgcolor: "grey.300" }}>
                        <EventNoteRoundedIcon color="warning" />
                    </Avatar>

                    <Box>
                        <Typography fontWeight="bold">
                            User is requesting for a new Schedule!
                        </Typography>
                        <Stack
                            direction={{ xs: "row", sm: "row" }}
                            alignItems="center"
                            gap={{ xs: 1, sm: 2 }}
                        >
                            <Typography variant="body2" fontWeight={300}>
                                4 hrs ago
                            </Typography>
                            <Button size="small" color="warning" disableRipple>
                                In Progress
                            </Button>
                        </Stack>
                    </Box>
                </Stack>

                <Stack
                    direction="row"
                    gap={2}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Avatar sx={{ width: 50, height: 50, bgcolor: "grey.300" }}>
                        <LibraryAddCheckOutlinedIcon color="success" />
                    </Avatar>

                    <Box>
                        <Typography fontWeight="bold">
                            User is already done on task!
                        </Typography>
                        <Stack
                            direction={{ xs: "row", sm: "row" }}
                            alignItems="center"
                            gap={{ xs: 1, sm: 2 }}
                        >
                            <Typography variant="body2" fontWeight={300}>
                                1 hr ago
                            </Typography>
                            <Button size="small" color="success" disableRipple>
                                DONE!
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Section>
    );
};

const Section = ({ title, children }) => {
    return (
        <Box width="100%" mb={5} mt={5}>
            <Typography variant="h6" fontWeight={500} mb={3}>
                {title}
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
