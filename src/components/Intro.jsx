import React from "react";
import {
    Box,
    Button,
    Container,
    Stack,
    styled,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import bg from "../asset/map.svg";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/slicer/authSlice";

const animation = makeStyles((theme) => ({
    float: {
        animation: `$pulse 3s ${theme.transitions.easing.easeInOut} infinite`,
    },
    "@keyframes pulse": {
        "0%": {
            transform: "translatey(0px)",
        },
        "50%": {
            transform: "translatey(5px)",
        },
        "100%": {
            transform: "translatey(0px)",
        },
    },
}));

const Intro = () => {
    const navigate = useNavigate();
    const login = useSelector(isLoggedIn);
    const classes = animation();

    const scroller = () => {
        const section = document.querySelector(".section");
        const sc = section.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Box sx={{ backgroundColor: "#cbf2f7", position: "relative" }}>
            <Container>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                >
                    <Stack
                        sx={{
                            width: "100%",
                            m: "auto",
                            pt: { xs: 20, sm: 10 },
                            pb: 5,
                        }}
                        alignItems="center"
                    >
                        <Typography
                            variant="h2"
                            fontWeight="bold"
                            align="center"
                        >
                            Find Your{" "}
                            <Box component="span" color="#0277bd">
                                Mentor
                            </Box>
                        </Typography>

                        <Typography align="center">
                            Search, Browse, Pick, Schedule and Learn!
                        </Typography>

                        <Stack
                            sx={{ mt: 10, zIndex: 1 }}
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={scroller}
                                endIcon={<KeyboardArrowDownRoundedIcon />}
                            >
                                Get Started
                            </Button>

                            {!login && (
                                <Button
                                    color="inherit"
                                    size="large"
                                    onClick={() =>
                                        navigate("/account/register")
                                    }
                                >
                                    Sign Up
                                </Button>
                            )}
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            width: "100%",
                            height: {
                                xs: 450,
                                sm: 500,
                                md: 550,
                                lg: 650,
                            },
                            padding: 2,
                            paddingLeft: 5,
                            pb: {
                                xs: 10,
                            },
                        }}
                        display={{
                            xs: "none",
                            sm: "block",
                        }}
                    >
                        <img
                            src={bg}
                            alt="logo"
                            width="100%"
                            height="100%"
                            className={classes.float}
                        />
                    </Box>
                </Stack>
            </Container>
            <Arrow />
        </Box>
    );
};

const Arrow = styled("div")(() => ({
    width: 30,
    height: 30,
    backgroundColor: "inherit",
    transform: "rotate(45deg) translateX(-50%)",
    position: "absolute",
    bottom: -25,
    left: "50%",
    // top: '10%'
}));

export default Intro;
