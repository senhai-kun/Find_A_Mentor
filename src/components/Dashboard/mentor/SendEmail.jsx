import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Chip, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import Section from '../../../reusable/Section';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import axios from 'axios';
import baseUrl from '../../../utils/baseUrl';

const SendEmail = ({ user, menteeList }) => {
    const [sendTo, setSendTo] = useState([]);
    const [msg, setMsg] = useState("");
    const [sending, setSending] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [alertMsg, setAlertMsg] = useState("")

    const handleChange = e => {
        setSendTo(
            typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
        )
    }

    const handleSendEmail = async () => {
        setSending(true);

        try {
            // from, to, mentor
            const res = await axios.post(`${baseUrl}/email`, {
                from: user?.email,
                to: sendTo,
                mentor: `${user?.firstname} ${user?.lastname}`,
                text: msg
            })

            console.log(res.data);
            setAlertMsg(res.data.msg);
            setOpenSnack(true)
        } catch (error) {
            console.error(error);
            setAlertMsg(error.response.data.msg);
        } finally {
            setSending(false);
        }
    }

    return (
        <React.Fragment>
            <Section title="Compose an Email" subtitle="Mentee Email" >
                <Select  
                    value={sendTo}
                    size="small"
                    displayEmpty
                    multiple
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Select an email you wish to send</em>;
                        }
                        return (
                            <Stack display="column" gap={1} >
                                { selected.map( value => (
                                    <Chip key={value} label={value} color="primary" sx={{ fontSize: 15 }} />
                                )) }
                            </Stack>
                        );
                    }}
                    onChange={handleChange}
                    sx={{ mb: 3 }} 
                >
                    {menteeList?.map( (i, index) => (
                        <MenuItem key={index} value={i?._id?.email} >{i?._id?.email}</MenuItem>
                    ))}
                </Select>

                <Box>
                    <TextField 
                        fullWidth
                        multiline
                        minRows={4}
                        sx={{ whiteSpace: "pre-wrap" }}
                        value={msg}
                        onChange={ e => setMsg(e.target.value)}
                        placeholder="Compose an email..."
                    />
                </Box>

                <Box mt={2} textAlign="right" >
                    <LoadingButton 
                        variant="contained"
                        endIcon={<SendRoundedIcon />}
                        loading={sending}   
                        loadingPosition="end"
                        onClick={handleSendEmail}
                    >
                        Send
                    </LoadingButton>
                </Box>
            </Section>

            <Snackbar 
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={ () => setOpenSnack(false)}
            >
                <Alert variant="filled" onClose={ () => setOpenSnack(false)} severity="success" sx={{ width: '100%' }} >
                    {alertMsg}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}


export default SendEmail