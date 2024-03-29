import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Container,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import professions from "../utils/professions";
import { useSelector } from "react-redux";
import { userData } from "../redux/slicer/userSlice";
import { isLoading } from "../redux/slicer/authSlice";
import Loading from "../reusable/Loading";
/*
    notes: 
        counting words (done)
        skills accepts spaces
*/

const GettingStarted = () => {

    const user = useSelector(userData);
    const loading = useSelector(isLoading);

    const mobile = useMediaQuery( theme => theme.breakpoints.down("sm") );
    const navigate = useNavigate();

    const [profession, setProfession] = useState("");
    // const [profession, setProfession] = useState([]);
    // const [customCategory, setCustomCategory] = useState("");

    const [skill, setSkill] = useState([]);
    const [addSkill, setAddSkill] = useState("");
    const [about, setAbout] = useState("");
    const [count, setCount] = useState(0);

    useEffect( () => {
        console.log(user)
        if( !loading ) {
            if( user?.ismentor && user?.details?.skills?.length !== 0 ) {
                navigate("/search", { replace: true });

            }
        }
    }, [user, loading]);

    const handleDeleteSkill = (indexToDelete) => {
        setSkill( currentList => currentList.filter( (_, index) => indexToDelete !== index ) )
    }

    const handleChange = (e) => {
        setAbout(e.target.value)

        // count input words
        setCount(e.target.value.trim().split(" ").filter( i => i !== "" ).length );

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( profession === "placeholder" || count < 100 || skill.length < 3) {
            console.log("don't submit")
        } else {
            console.log("submit form", skill.length);

            try {
                const user = await axios.post(`${baseUrl}/account/update_mentor`, 
                    { profession, skills: skill, about },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "fam-id"
                            )}`,
                        },
                        withCredentials: true,
                    }
                )

                console.log(user)
                navigate("/account/settings");

            } catch (error) {
                console.log(error.response)
            }

        }
        
    }

    return loading ? <Loading /> : (
        <React.Fragment>
            <Container sx={{ p: 2 }} component="form" onSubmit={handleSubmit}>
                <Typography variant="h3" fontWeight="bold" pt={4}>
                    Getting Started
                </Typography>

                <Box pt={5}>
                    <Typography variant="h5" >
                        What is your Field Expertise/Profession?
                    </Typography>

                    <Autocomplete 
                        value={profession}
                        // multiple={true}
                        placeholder="Select your profession..."
                        onChange={(e, newVal) => setProfession(newVal)}
                        options={professions}
                        size="small"
                        autoHighlight
                        renderInput={ params => <TextField {...params} required /> }
                    />
                </Box>

                <Box pt={5}>
                    <Typography variant="h5" >
                        What are your Skills?
                    </Typography>
                    <Typography sx={{ opacity: 0.6 }} >You can give as many as you can with minimum of 3.</Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap" pt={3}>
                        {skill.map((skill, index) => (
                            <Chip
                                key={index}
                                value={skill}
                                label={skill}
                                variant="contained"
                                color="info"
                                sx={{ fontSize: 18 }}
                                deleteIcon={<HighlightOffRoundedIcon />}
                                onDelete={() => handleDeleteSkill(index)}
                            />
                        ))}
                    </Stack>

                    <Stack direction="row" gap={1} pt={2}>
                        <TextField
                            size="small"
                            value={addSkill}
                            onChange={(e) => setAddSkill(e.target.value)}
                        />
                        <Button
                            onClick={() => {
                                
                                if(addSkill.trim().length > 2 ) {
                                    setSkill((currentList) => [
                                        ...currentList,
                                        addSkill,
                                    ]);
                                    setAddSkill("");
                                }
                               
                            }}
                            variant="contained"
                            color="info"
                            startIcon={<PlaylistAddRoundedIcon />}
                        >
                            Add
                        </Button>
                    </Stack>
                </Box>

                <Box pt={5}>
                    <Typography variant="h4">Tell us About Yourself </Typography>
                    
                    <Typography align="right" pt={3}>{count} words to count</Typography>

                    <TextField 
                        multiline
                        minRows={ mobile ? 4 : 8 }
                        fullWidth
                        value={about}
                        onChange={handleChange}
                        color="info"
                        placeholder="Write about yourself in more than 100words to impress your mentees..."
                        required
                        sx={{ whiteSpace: "pre-wrap" }}
                    />

                </Box>

                <Box pt={3} textAlign="right" >
                    <Button type="submit" variant="contained" >Finish</Button>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default GettingStarted;
