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
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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
    const user = useSelector(userData);
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
        navigate(`/account/profile/${user?.ref_id}`);
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
                            <Typography onClick={ () => navigate("/")} variant="h5" fontWeight="bolder"sx={{ cursor: "pointer" }} >
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
                                            variant="text"
                                            color="inherit"
                                            onClick={navigateFindMentor}
                                            startIcon={<SearchRoundedIcon />}
                                            
                                        >
                                            Search
                                        </Button>

                                        <UserMenu user={user} />
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
                                    Dashboard
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

const UserMenu = ({ user }) => {
    const navigate = useNavigate();
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
        navigate(`/account/profile/${user?.ref_id}`);
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
                    src={user?.img}
                    alt={user?.firstname}
                />
                <Typography fontWeight={500} textTransform="capitalize">{user?.firstname}</Typography>
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
                        <Typography>Dashboard</Typography>
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
