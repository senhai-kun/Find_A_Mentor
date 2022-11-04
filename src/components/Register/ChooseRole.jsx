import { useState } from "react";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import mentee from "../../asset/mentee.jpg";
import mentor from '../../asset/mentor.jpg';
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slicer/authSlice";
import LoadingButton from "@mui/lab/LoadingButton";

const ChooseRole = ({ open, close, submit, setIsMentor, setError, setErrorMsg }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ select, setSelect ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const { submitForm, values, setFieldError } = useFormikContext();

    const handleClose = () => {
        setSelect("")
        close(false);
        submit(false);
    }

    const handlePickMentee = () => {
        setSelect("mentee");
    }

    const handlePickMentor = () => {
        setSelect("mentor");
    }

    const save = async () => {
        setIsMentor( select === "mentee" ? false : true);
        // close(false);
        // submitForm()
        setLoading(true)
        try {
            const fetch = await axios.post(
                `${baseUrl}/account/register`,
                { ...values, ismentor: select === "mentor" ? true : false },
                {
                    withCredentials: true,
                }
            );

            dispatch(registerUser({ navigate, data: fetch.data }));
            
        } catch (err) {
            close(false);
            console.log(err.response.data);
            setErrorMsg(err.response.data.email);
            setError(true)
            setFieldError(err.response.data.param, err.response.data.errorMsg);
        } finally {
            submit(false)
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} >
            <DialogTitle sx={{ fontWeight: 'bold' }} >Choose Your Role</DialogTitle>
            <DialogContent dividers sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
                <Stack direction='row' justifyContent="space-between" height="100%" gap={{ xs: 1, sm: 4 }}>
                    <Box 
                        textAlign="center" 
                        sx={{ 
                            border: select === "mentor" ? '2px solid grey' : '2px solid green', 
                            ":hover": { transform: select === "" ? "scale(1.02)" : "scale(1.05)", transition: "0.1s " },
                            zIndex: 2,
                            cursor: "pointer",
                            p: 2,
                            height: '100%',
                            transform: select === "mentee" && "scale(1.05)",
                            // disabled if not picked
                            filter: select === "mentor" && 'brightness(70%)',
                            backgroundColor: select === "mentor" && 'rgba(0,0,0,0.3)',
                            opacity: select === "mentor" && 0.7,
                            transition: "0.3s "
                        }} 
                        borderRadius={4}
                        onClick={handlePickMentee} 
                    >
                        <Typography variant="h4" fontWeight="bold" sx={{ pb: 2 }}>I am <Typography component="span" variant="inherit" fontWeight="bold" color={(theme) => theme.palette.success.main}>Mentee</Typography> </Typography>
                        <Avatar src={mentee} sx={{ width: '100%', height: { xs: '50%', sm: '75%' } }} alt="mentee" />
                    </Box>
                    <Box 
                        textAlign="center" 
                        sx={{ 
                            border: select === "mentee" ? '2px solid grey' : '2px solid #1976d2',                           
                            ":hover": { transform: select === "" ? "scale(1.02)" : "scale(1.05)", transition: "all 0.1s ease-out" },
                            zIndex: 2,
                            cursor: "pointer",
                            p: 2,
                            height: '100%',
                            transform: select === "mentor" && "scale(1.05)",
                            filter: select === "mentee" &&  'brightness(70%)',
                            backgroundColor: select === "mentee" &&  'rgba(0,0,0,0.3)',
                            opacity: select === "mentee" &&  0.7,
                            transition: "0.3s"
                        }} 
                        borderRadius={4}
                        onClick={handlePickMentor} 
                    >
                        <Typography variant="h4" fontWeight="bold" sx={{ pb: 2 }}>I am <Typography component="span" variant="inherit" fontWeight="bold" color={(theme) => theme.palette.primary.main}>Mentor</Typography></Typography>
                        <Avatar src={mentor} sx={{ width: '100%', height: { xs: '50%', sm: '75%' } }} />
                    </Box>
                    
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">Close</Button>
                <LoadingButton loading={loading} onClick={save} type="submit" variant="contained" color={ select === "mentee" ? "success" : "primary" } disabled={select === "" && true} >Select</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default ChooseRole;