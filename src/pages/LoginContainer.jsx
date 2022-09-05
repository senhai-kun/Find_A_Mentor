import React, { useEffect } from "react";
import {
    Box,
    Stack,
    styled,
} from "@mui/material";
import loginbg from "../asset/login.svg";
import registerbg from "../asset/register.svg";
import Login from "../components/Login";
import Register from "../components/Register/Register";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const textColorPri = "#144ec7";
const textColorSec = "#0028f3";

const Image = styled("img")(() => ({
    width: "80%",
    height: "80%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
}));

const Bg = () => {
    const location = useLocation();
    return (
        <Box
            bgcolor={
                location.pathname === "/account/login"
                    ? textColorPri
                    : 
                    "#ed6c02"
            }
            width={{ sm: "0%", md: "60%" }}
            position="relative"
            minHeight="100vh"
        >
            <Image
                alt="Search Logo"
                src={
                    location.pathname === "/account/login"
                        ? loginbg
                        : registerbg
                }
            />
        </Box>
    );
};

const Header = ({ title, path }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link
                rel="canonical"
                href={`https://find-mentor.vercel.app${path}`}
            />
        </Helmet>
    );
};

const LoginContainer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("fam-id")) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return (
        <React.Fragment>
            <Header
                title={
                    pathname === "/account/login"
                        ? "Login - Mentor"
                        : "Register - Mentor"
                }
                path={pathname}
            />
            <Stack
                direction={
                    pathname === "/account/login" ? "row-reverse" : "row"
                }
                // direction="row"
                alignItems="center"
            >
                <Bg />

                {pathname === "/account/login" ? <Login /> : <Register />}
            </Stack>
        </React.Fragment>
    );
};

export default LoginContainer;
