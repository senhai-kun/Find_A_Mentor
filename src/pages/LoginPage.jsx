import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    InputAdornment,
    Divider,
    styled,
    Checkbox,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import loginbg from "../asset/login.svg";
import registerbg from "../asset/register.svg";
import Register from "./RegisterPage";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slicer/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Helmet } from "react-helmet";
import baseUrl from "../utils/baseUrl";

const textColorPri = "#144ec7";
const textColorSec = "#0028f3";

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(3, "Password should be of minimum 3 characters length")
        .required("Password is required"),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [submit, setSubmit] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (e, { setFieldError }) => {
            setSubmit(true);
            try {
                const fetch = await axios.post(`${baseUrl}/account/login`, e, {
                    withCredentials: true,
                    // headers: {
                    //     // withCredentials: true,
                    //     // credentials: "same-origin",
                    //     // "Access-Control-Allow-Credentials": true,
                    // },
                });

                console.log(fetch.data);
                dispatch(
                    loginUser({ success: fetch.data, navigate, location })
                );
            } catch (e) {
                setFieldError(e.response.data.param, e.response.data.errorMsg);
                console.log(e.response);
            } finally {
                setSubmit(false);
            }
        },
    });

    return (
        <Box width="100%">
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                autoComplete="true"
                width={{ xs: "80%", sm: "70%", md: "80%", lg: "60%" }}
                m="auto"
                pt={5}
                pb={5}
            >
                <Typography
                    variant="h4"
                    fontWeight="600"
                    color={textColorPri}
                    mb={1}
                >
                    Login to your account.
                </Typography>

                <Typography
                    color={textColorPri}
                    sx={{ opacity: 0.8 }}
                    mb={5}
                    variant="body1"
                >
                    Welcome Back! Please enter your details.
                </Typography>

                <Stack direction="column" spacing={3} width="100%" mt={2}>
                    <TextField
                        size="medium"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon
                                        color={
                                            formik.touched.email &&
                                            Boolean(formik.errors.email)
                                                ? "error"
                                                : "primary"
                                        }
                                    />
                                </InputAdornment>
                            ),
                            sx: {
                                color:
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                        ? "red"
                                        : textColorPri,
                            },
                        }}
                        variant="outlined"
                        focused
                        // required
                    />

                    <TextField
                        size="medium"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyOutlinedIcon
                                        color={
                                            formik.touched.password &&
                                            Boolean(formik.errors.password)
                                                ? "error"
                                                : "primary"
                                        }
                                        sx={{ transform: "rotate(90deg)" }}
                                    />
                                </InputAdornment>
                            ),
                            sx: {
                                color:
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                        ? "red"
                                        : textColorPri,
                            },
                        }}
                        // variant='outlined'
                        focused
                        // required
                    />
                </Stack>

                <Stack direction="row" alignItems="center" mb={3}>
                    <Checkbox color="primary" />
                    <Typography color={textColorPri}>Remember me</Typography>
                </Stack>

                <LoadingButton
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    loading={submit}
                >
                    Sign in
                </LoadingButton>

                <Divider
                    sx={{ mt: 3, mb: 3, color: textColorSec, opacity: 0.8 }}
                    light={false}
                >
                    Don't have an account?
                </Divider>

                <Button
                    onClick={() => navigate("/account/register")}
                    variant="outlined"
                    fullWidth
                    size="large"
                    color="warning"
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
};

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
                    : "#ed6c02"
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
        if (
            localStorage.getItem("fam-id") &&
            document.cookie.includes("fam-ses")
        ) {
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
