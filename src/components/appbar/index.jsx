import React, { useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import { Spiral as Hamburger } from "hamburger-react";
import { makeStyles } from "@mui/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, logoutUser } from "../../redux/slicer/authSlice";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { userData } from "../../redux/slicer/userSlice";

const style = makeStyles((theme) => ({
    menuWrapper: {
        position: "absolute",
        backgroundColor: "white",
        textAlign: "center",
        width: "100%",
        height: "100vh",
        top: "100%",
        transition: "all .5s ease",
    },
    close: {
        left: "-100%",
        // backgroundColor: 'white',
        width: "100%",
        transition: "all .5s ease-out",
    },
    open: {
        // position: 'sticky',
        top: "100%",
        left: "0%",
        backgroundColor: "white",
        // width: '100%',
        // textAlign: 'center',
        transition: "all .5s ease",
    },
}));

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loggedIn } = useSelector(auth);
    const dispatch = useDispatch();
    const classes = style();
    const [isOpen, setOpen] = useState(false);

    const scroll = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const navigateHome = () => {
        navigate("/");
        setOpen(false);
    };

    const navigateBecomeMentor = () => {
        navigate("/account/register");
        setOpen(false);
    };
    const navigateFindMentor = () => {
        navigate("/search");
        setOpen(false);
    };
    const navigateLogin = () => {
        navigate("/account/login", { state: location.pathname });
        setOpen(false);
    };

    const navigateProfile = () => {
        navigate("/account/profile/monicabaidu");
        setOpen(false);
    };

    const navigateSettings = () => {
        navigate("/account/settings");
        setOpen(false);
    };

    const logout = () => {
        dispatch(logoutUser(navigate));
    };

    return (
        <Box>
            <AppBar
                position="fixed"
                color={isOpen || scroll ? "inherit" : "transparent"}
                elevation={isOpen || scroll ? 5 : 0}
                enableColorOnDark
            >
                <Toolbar>
                    <Container>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h5" fontWeight="bolder">
                                MENTOR
                            </Typography>

                            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                                <Hamburger toggled={isOpen} toggle={setOpen} />
                            </Box>

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ display: { xs: "none", sm: "flex" } }}
                                alignItems="center"
                            >
                                {/* <Box
                                    display={{
                                        xs: "none",
                                        sm: "none",
                                        md: "block",
                                    }}
                                >
                                    <Search />
                                </Box> */}
                                <Button
                                    type="text"
                                    color="inherit"
                                    onClick={navigateHome}
                                >
                                    Home
                                </Button>
                                {!loggedIn ? (
                                    <React.Fragment>
                                        <Button
                                            type="text"
                                            color="inherit"
                                            onClick={navigateBecomeMentor}
                                        >
                                            Become a mentor
                                        </Button>
                                        <Button
                                            type="text"
                                            color="inherit"
                                            onClick={navigateLogin}
                                        >
                                            Login
                                        </Button>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Button
                                            type="text"
                                            color="inherit"
                                            onClick={navigateFindMentor}
                                        >
                                            Find a Mentor
                                        </Button>

                                        <UserMenu />
                                    </React.Fragment>
                                )}
                            </Stack>
                        </Stack>
                    </Container>
                </Toolbar>

                {/* mobile view */}
                <Box
                    className={[
                        classes.menuWrapper,
                        isOpen ? classes.open : classes.close,
                    ]}
                    display={{ xs: "block", sm: "none" }}
                >
                    <Stack direction="column" spacing={5} sx={{ p: 5 }}>
                        <Button
                            type="text"
                            color="inherit"
                            onClick={navigateHome}
                        >
                            Home
                        </Button>
                        {!loggedIn ? (
                            <React.Fragment>
                                <Button
                                    type="text"
                                    color="inherit"
                                    onClick={navigateBecomeMentor}
                                >
                                    Become a mentor
                                </Button>
                                <Button
                                    type="text"
                                    color="inherit"
                                    onClick={navigateLogin}
                                >
                                    Login
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button
                                    type="text"
                                    color="inherit"
                                    onClick={navigateFindMentor}
                                >
                                    Find a Mentor
                                </Button>

                                <Button
                                    // startIcon={<AccountCircleRoundedIcon />}
                                    type="text"
                                    color="inherit"
                                    onClick={navigateProfile}
                                >
                                    Profile
                                </Button>

                                <Button
                                    // startIcon={<AccountCircleRoundedIcon />}
                                    type="text"
                                    color="inherit"
                                    onClick={navigateSettings}
                                >
                                    Settings
                                </Button>

                                <Button
                                    startIcon={<LogoutOutlinedIcon />}
                                    type="text"
                                    color="error"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </React.Fragment>
                        )}
                    </Stack>
                </Box>
            </AppBar>
        </Box>
    );
};

const UserMenu = () => {
    const navigate = useNavigate();
    const user = useSelector(userData);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        handleClose();
        navigate("/account/profile/monicabaidu");
    };

    const goToSettings = () => {
        handleClose();
        navigate("/account/settings");
    };

    const logout = () => {
        dispatch(logoutUser(navigate));
        handleClose();
    };

    return (
        <React.Fragment>
            <IconButton
                size="small"
                id="basic-button"
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{ gap: 1 }}
                onClick={handleClick}
            >
                <Avatar
                    // src="https://cdn.mentorcruise.com/cache/f2dd6a7a12e4f3903dc1c9b9cea331e3/0fc92fa3aea69827/53dd96af93a989e04300c14eb9695c9c.jpg"
                    src={user?.img}
                    alt="Monica Badiu"
                />
                <Typography fontWeight={500}>{user?.firstname}</Typography>
            </IconButton>
            <Menu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={goToProfile}>
                    <ListItemIcon>
                        <AccountCircleRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography>Profile</Typography>
                    </ListItemText>
                </MenuItem>

                <MenuItem onClick={goToSettings}>
                    <ListItemIcon>
                        <SettingsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography>Settings</Typography>
                    </ListItemText>
                </MenuItem>

                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon color="error" />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography color="error">Logout</Typography>
                    </ListItemText>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default Header;
