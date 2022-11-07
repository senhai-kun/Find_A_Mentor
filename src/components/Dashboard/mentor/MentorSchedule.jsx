import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react'
import Section from '../../../reusable/Section';


const MentorSchedule = ({ setTo, setSetTo, menteeList, from, setFrom, to, setToEnd, handleMentorSchedule }) => {
    const [loading, setLoading] = useState(false);

    const handleSetDate = (e) => {
        // setLoading(true)
        e.preventDefault();
        handleMentorSchedule()
    }

    return (
            <Section title="Schedule" subtitle="Set Schedule">
                <Typography>Mentee Email</Typography>
                <Select 
                    value={setTo} 
                    onChange={ e => setSetTo(e.target.value)}
                    sx={{ mb: 3 }} 
                    size="small"
                    // renderValue={ (selected) => {
                    //     if (selected) {
                    //         return <em>Select an email you wish to send</em>;
                    //     }
                    //     console.log("selected:", selected)

                    //     return selected;
                    // }}
                >
                    {menteeList?.map( (i, index) => (
                        <MenuItem key={index} value={i?._id?.email} >{i?._id?.email}</MenuItem>
                    ))}
                </Select>

                <Stack component="form" onSubmit={handleSetDate} gap={1} direction="column">
                    <Typography>Start: </Typography>
                    <TextField 
                        type="datetime-local"
                        value={from === null ? "" : from}
                        onChange={ (e) => {
                            setFrom(e.target.value);
                        }}
                        inputProps={{ min: moment().format("YYYY-MM-DD[T]HH:mm") }}
                        size="small"
                        required
                    />
                    <Typography>End: </Typography>
                    <TextField 
                        type="datetime-local"
                        disabled={from === null && true}
                        value={to === null ? "" : to}
                        onChange={ (e) => {
                            setToEnd(e.target.value);

                        }}
                        inputProps={{ min: moment(from).add(1, "minutes").format("YYYY-MM-DD[T]HH:mm") }}
                        size="small"
                        required
                    />
                    <LoadingButton type="submit" loading={loading} variant="contained" >Set Date</LoadingButton>
                </Stack>
            </Section>
    )
}

export default MentorSchedule