import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, DialogActions, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import moment from "moment";

const DateSetter = ({ event }) => {
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState(null);
    const [to, setToEnd] = useState(null);

    console.log("event: ", event)
    return (
        <Box sx={{ minWidth: { xs: "100%", sm: "600px" } }} >
            <div style={{ padding: "1rem" }}>

            <Typography mb={2} variant="h5" >Set Schedule</Typography>

            <Typography>Start: </Typography>
            <TextField
                type="datetime-local"
                inputProps={{ min: moment().format("YYYY-MM-DD[T]HH:mm") }}
                size="small"
                required
                fullWidth
            />

            <Typography mt={2} >End: </Typography>
            <TextField
                type="datetime-local"
                inputProps={{ min: moment(from).add(1, "minutes").format("YYYY-MM-DD[T]HH:mm") }}
                size="small"
                required
                fullWidth
            />


            </div>

            <DialogActions>
                <Button onClick={event.close}>Cancel</Button>
                <Button >Confirm</Button>
            </DialogActions>
        </Box>
    );
};

export default DateSetter;
