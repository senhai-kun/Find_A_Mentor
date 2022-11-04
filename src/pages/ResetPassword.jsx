import React, { useEffect, useState } from "react";
import { Container, TextField, Typography, Stack, Button, Box, styled } from "@mui/material";
import AppbarSpace from "../reusable/AppbarSpace";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { logoutUser } from "../redux/slicer/authSlice";
import Loading from "../reusable/Loading";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import bg from "../asset/reset.svg"
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

const Image = styled("img")(() => ({
    width: "80%",
    height: "80%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
}));

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [verifying, setVerifying] = useState(true);
    const [resetToken, setResetToken] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        if ( localStorage.getItem("fam-id") !== null ) { // user currently logged in
            // logout them first
            dispatch(logoutUser(navigate));
        }
    }, [])

    useEffect( () => {
        const verifyToken = async () => {
            try {
                const res = await axios.post(`${baseUrl}/account/reset/verify`, { token: searchParams.get("token") })
                
                console.log(res.data);

                if(!res.data.success) {
                    alert(`Error: ${res.data.msg}. Request a new one.`);
                    navigate("/account/login")
                }

                // token verified
                setVerifying(false);
                setResetToken(res.data.resetToken);

            } catch (error) {
                console.log(error.response)
                alert(`There was an error: ${error}. Please refresh the page.`)
            }
        }

        verifyToken();

    }, [])

    const validation = yup.object({
        newPassword: yup
            .string("Enter your new password")
            .min(3, "Password should be of minimum 3 characters length")
            .required("Password is required")
            .matches(/^\S*$/, "Spaces are not valid"),
        confirmPassword: yup
            .string("Enter your password")
            .min(3, "Password should be of minimum 3 characters length")
            .oneOf([yup.ref("newPassword")], "New Password not matched!")
            .required("Enter again your new password to continue")
    })

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: validation,
        onSubmit: async (val) => {
            console.log(val);
            setLoading(true);
            try {
                const res = await axios.post(`${baseUrl}/account/reset/password`, { newPassword: val.newPassword, resetToken })

                if(!res.data.success) {
                    alert(`Error: ${res.datamsg}`);
                    navigate(0);
                } else {
                    alert(`Success: ${res.data.msg}`);
                    navigate("/account/login");
                }
            } catch (error) {
                alert(`Please refresh the page. There was an error: ${error}`)
            } finally {
                setLoading(false)
            }
        }
    })

    return verifying ? <Loading /> : (
        <React.Fragment>
            <Stack direction="row" alignItems="center" >
                <Box 
                    bgcolor="#172E59"
                    width={{ sm: "0%", md: "60%" }} 
                    position="relative" 
                    minHeight="100vh"
                >
                    <Image 
                        alt="reset BG"
                        src={bg}
                    />
                </Box>

                <Container width="100%"  >
                    <Box m="auto" width={{ xs: "80%", sm: "70%", md: "80%", lg: "70%" }}>
                        <Typography variant="h4" fontWeight="bold" >
                            Reset Password
                        </Typography>
                        <Typography
                            sx={{ opacity: 0.8 }}
                            mb={5}
                            variant="body1"
                        >
                            You account is about to be reset, please enter a new password to continue.
                        </Typography>

                        <Stack component="form" onSubmit={formik.handleSubmit} mt={2} gap={3}  justifyContent="center" >
                            <TextField 
                                label="New Password"
                                fullWidth
                                name="newPassword"
                                type="password"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.newPassword &&
                                    Boolean(formik.errors.newPassword)
                                }
                                helperText={
                                    formik.touched.newPassword &&
                                    formik.errors.newPassword
                                }
                                
                            />
                            <TextField 
                                label="Confirm New Password"
                                fullWidth
                                name="confirmPassword"
                                type="password"
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

                            <Stack direction="row" gap={4} >
                                <Button fullWidth color="inherit" onClick={ () => navigate("/account/login") } >
                                    Back To Login
                                </Button>
                                <LoadingButton loading={loading} fullWidth type="submit" variant="contained"  >
                                    Save
                                </LoadingButton>
                            </Stack>
                            
                        </Stack>
                    </Box>
                </Container>
            </Stack>
        </React.Fragment>
    );
};

export default ResetPassword;
