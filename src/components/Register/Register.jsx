import React, { Suspense, useEffect, useState } from "react";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    InputAdornment,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login, registerUser } from "../../redux/slicer/authSlice";
import baseUrl from "../../utils/baseUrl";

import AlertMessage from './AlertMessage';
const ChooseRole = React.lazy( () => import('./ChooseRole'));

// const textColorPri = "#c45a04";
const textColorPri = "black";
const outlineColor = "#c45a04"
// const textColorSec = "#c47104";

const validationSchema = yup.object({
    firstname: yup
        .string("Enter a valid name")
        .min(2, "Name must be ")
        .max(20, "Must be 20 characters or less")
        .required("Firstname must not be empty")
        .matches(/^[^\s].+[a-zA-Z]+[a-zA-Z]+$/, "This name is not valid."),
    lastname: yup
        .string("Enter a valid surname")
        .max(20, "Must be 20 characters or less")
        .required("Lastname must not be empty")
        .matches(/^[^\s].+[a-zA-Z]+[a-zA-Z]+$/, "This name is not valid."),
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(3, "Password should be of minimum 3 characters length")
        .required("Password is required")
        .matches(/^\S*$/, "Spaces are not valid"),
    confirmPassword: yup
        .string("Enter your password")
        .min(3, "Password should be of minimum 3 characters length")
        .oneOf([yup.ref("password")], "Password not matched"),
});

const Input = ({
    placeholder,
    type,
    icon,
    value,
    onChange,
    onBlur,
    error,
    helperText,
    capitalized,
    name,
}) => {
    return (
        <TextField
            name={name}
            size="medium"
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{icon}</InputAdornment>
                ),
                sx: {
                    color: textColorPri,
                },
            }}
            inputProps={{
                style: { textTransform: capitalized && "capitalize" },
            }}
            variant="outlined"
            focused
            fullWidth
            color="warning"
            // required
        />
    );
};


const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMentor, setIsMentor] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <Box width="100%">
            <Formik
                initialValues={{
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit = {async (e, { setFieldError }) => {
                    setSubmit(true);
                    try {
                        const fetch = await axios.post(
                            `${baseUrl}/account/register`,
                            { ...e, ismentor: isMentor },
                            {
                                withCredentials: true,
                            }
                        );

                        console.log("login from register: ", fetch.data)
                        dispatch(registerUser({ navigate, data: fetch.data }));
                        
                    } catch (err) {
                        // dispatch(login(e.response.data.success));
                        console.log(err.response.data);
                        setErrorMsg(err.response.data.email);
                        setError(true)
                        setFieldError(err.response.data.param, err.response.data.errorMsg);
                    } finally {
                        setSubmit(false);
                    }
                }}

            >

                { (formik) => (
                    <Box
                        component="form"s
                        onSubmit={formik.handleSubmit}
                        width={{ xs: "80%", sm: "70%", md: "80%", lg: "70%" }}
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
                            Create an account.
                        </Typography>

                        <Typography
                            color={textColorPri}
                            sx={{ opacity: 0.8 }}
                            mb={5}
                            variant="body1"
                        >
                            Let's get started by signing up to your account!
                        </Typography>
                        
                        <Stack
                            direction="column"
                            spacing={3}
                            width="100%"
                            mt={2}
                            mb={3}
                        >
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2} >
                                <Input
                                    placeholder="First Name"
                                    name="firstname"
                                    type="text"
                                    icon={
                                        <AccountCircleOutlinedIcon
                                            sx={{ color: outlineColor }}
                                        />
                                    }
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    capitalized
                                    error={
                                        formik.touched.firstname &&
                                        Boolean(formik.errors.firstname)
                                    }
                                    helperText={
                                        formik.touched.firstname &&
                                        formik.errors.firstname
                                    }
                                />
                                <Input
                                    placeholder="Last Name"
                                    name="lastname"
                                    type="text"
                                    icon={
                                        <AccountCircleOutlinedIcon
                                            sx={{ color: outlineColor }}
                                        />
                                    }
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.lastname &&
                                        Boolean(formik.errors.lastname)
                                    }
                                    helperText={
                                        formik.touched.lastname &&
                                        formik.errors.lastname
                                    }
                                    capitalized
                                />
                            </Stack>

                            <Input
                                placeholder="Email"
                                name="email"
                                type="email"
                                icon={
                                    <EmailOutlinedIcon sx={{ color: outlineColor }} />
                                }
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.email && Boolean(formik.errors.email)
                                }
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <Input
                                placeholder="Password"
                                name="password"
                                type="password"
                                icon={
                                    <KeyOutlinedIcon
                                        sx={{
                                            color: outlineColor,
                                            transform: "rotate(90deg)",
                                        }}
                                    />
                                }
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password && formik.errors.password
                                }
                            />

                            <Input
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                icon={
                                    formik.errors.confirmPassword ? (
                                        <CloseRoundedIcon sx={{ color: "red" }} />
                                    ) : (
                                        <CheckRoundedIcon
                                            sx={{ color: outlineColor }}
                                        />
                                    )
                                }
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.confirmPassword &&
                                    Boolean(formik.errors.confirmPassword)
                                }
                                helperText={
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword
                                }
                            />
                        </Stack>

                        <LoadingButton
                            variant="contained"
                            fullWidth
                            size="large"
                            color="warning"
                            sx={{ mt: 3 }}
                            onClick={ () => formik.isValid && setOpenRole(true)}
                            loading={submit}
                        >
                            Register
                        </LoadingButton>

                        <Divider
                            sx={{ mt: 3, mb: 3, color: textColorPri }}
                            light={false}
                        >
                            Already have an account?
                        </Divider>

                        <Button
                            onClick={() => navigate("/account/login")}
                            variant="outlined"
                            fullWidth
                            size="large"
                            color="primary"
                            sx={{ mb: { xs: 10, sm: 0 } }}
                        >
                            Sign in
                        </Button>
                        
                        <Suspense  fallback={<div>Loading...</div>}>
                            <ChooseRole open={openRole} close={setOpenRole} submit={setSubmit} setIsMentor={setIsMentor} />
                        </Suspense>

                    </Box>
                )}
            </Formik>
                        
            <AlertMessage open={error} close={setError} errorMsg={errorMsg} setErrorMsg={setErrorMsg} />                   
        </Box>
    );
};



export default Register;
