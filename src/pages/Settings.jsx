import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
    styled,
    Divider,
    Paper,
    InputAdornment,
    Checkbox,
    MenuItem,
    Chip,
    useMediaQuery,
    Autocomplete,
} from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AppbarSpace from "../reusable/AppbarSpace";
import { useDispatch, useSelector } from "react-redux";
import {
    loadComponent,
    setUser,
    updateProfile,
    userData,
} from "../redux/slicer/userSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "../components/Header";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import axios from 'axios';
import baseUrl from "../utils/baseUrl";
import Location from "../components/map/Location";
import SettingLocation from "../components/map/SettingLocation";
import professions from "../utils/professions";

const Input = styled("input")({
    display: "none",
});


const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector(userData);
    // const loading = useSelector(loadComponent);
    const [loading, setLoading] = useState(false)

    const [profileImage, setProfileImage] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [location, setLocation] = useState(() => {
        if (user?.coordinates) {
            return user?.coordinates
        } else {
            return { lat: 15.487104640287109, lng: 120.9642791748047 }
        }
    });

    useEffect(() => {
        setProfileImage(user?.img);
        // if (user.coordinates) {
        //     setLocation(user.coordinates)
        // }
        setFirstname(user?.firstname);
        setLastname(user?.lastname);
        
    }, [user]);

    const previewImg = (e) => {
        const reader = new FileReader();

        reader.onloadend = (e) => {
            setProfileImage(e.target.result);
            // console.log(e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    };
    console.log(location)

    const uploadImg = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                `${baseUrl}/account/update_profile`,
                { ismentor: user?.ismentor, img: profileImage, firstname, lastname, location, ref_id: user?.ref_id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "fam-id"
                        )}`,
                    },
                    withCredentials: true,
                }
            );

            dispatch(setUser(result.data.user))
            console.log(result)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            window.location.reload();

        }
        // if (user.img !== profileImage) {
            // dispatch(updateProfile({ img: profileImage, ismentor: user?.ismentor, ref_id: user?.ref_id, firstname, lastname, location}));
        // }
    };

    return (
        <React.Fragment>
            <Header title="Settings - Account" />
            <AppbarSpace color="#f2f4fb" />

            <Box bgcolor="#f2f4fb" pb={10}>
                <Container sx={{ pt: { xs: 5, sm: 10 } }}>
                    <Typography variant="h4" fontWeight="bold">
                        Personal Info
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={300}
                        sx={{ opacity: 0.6, mt: 1, mb: 2 }}
                    >
                        Upload your photo and personal details here.
                    </Typography>

                    <Paper
                        sx={{
                            m: { xs: 0, sm: 2, md: 5 },
                            p: { xs: 2, sm: 3, md: 5 },
                            border: "2px solid #dadce3",
                            borderRadius: (theme) => theme.shape.borderRadius,
                            // bgcolor: "inherit",
                        }}
                        elevation={0}
                    >
                        <Box>
                            <Stack direction="row" gap={2}>
                                <Box width="100%">
                                    <Typography fontWeight={300}>
                                        First name
                                    </Typography>
                                    <TextField
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Box>
                                <Box width="100%">
                                    <Typography fontWeight={300}>
                                        Last name
                                    </Typography>
                                    <TextField
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Box>
                            </Stack>

                            <Box mt={2}>
                                <Typography fontWeight={300}>Email</Typography>
                                <TextField
                                    value={user?.email}
                                    fullWidth
                                    size="small"
                                    disabled
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon color="inherit" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>

                        <ProfileImage
                            userAlt={user?.firstname}
                            profileImage={profileImage}
                            previewImg={previewImg}
                        />

                        <LocationSettings location={location} setLocation={setLocation} />

                        <Divider sx={{ pb: 3 }} />

                        <Stack direction="row" pt={2} pb={3} gap={2}>
                            <LoadingButton
                                fullWidth
                                variant="contained"
                                onClick={uploadImg}
                                loading={loading}
                            >
                                {loading ? "loading" : "Save"}
                            </LoadingButton>


                        </Stack>

                        <Box>

                        </Box>
                    </Paper>

                    { user?.ismentor && <MentorSettings user={user} /> }

                </Container>
            </Box>
        </React.Fragment>
    );
};

const LocationSettings = ({ location, setLocation }) => {

    return (
        <React.Fragment>
            <Typography variant="h6" fontWeight={300}>
                Location
            </Typography>

            <SettingLocation location={location} setLocation={setLocation} />

        </React.Fragment>
    )
}

const MentorSettings = ({ user }) => {

    const mobile = useMediaQuery( theme => theme.breakpoints.down("sm") );

    const [profession, setProfession] = useState(user.profession);
    const [skill, setSkill] = useState(user.details.skills);
    const [addSkill, setAddSkill] = useState("");
    const [about, setAbout] = useState(user.details.about);

    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setAbout(e.target.value)
    }

    const handleDeleteSkill = (indexToDelete) => {
        setSkill( currentList => currentList.filter( (_, index) => indexToDelete !== index ) )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( about < 100 || skill.length < 3 ) {
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

            } catch (error) {
                console.log(error.response)
            } finally {
                window.location.reload();
            }

        }
    }

    return (
        <React.Fragment>
            <Typography variant="h4" fontWeight="bold">
                Mentor Details
            </Typography>
            <Typography
                variant="body2"
                fontWeight={300}
                sx={{ opacity: 0.6, mt: 1, mb: 2 }}
            >
                Edit your mentor profile.
            </Typography>

            <Paper
                sx={{
                    m: { xs: 0, sm: 2, md: 5 },
                    p: { xs: 2, sm: 3, md: 5 },
                    border: "2px solid #dadce3",
                    borderRadius: (theme) => theme.shape.borderRadius,
                    // bgcolor: "inherit",
                }}
                elevation={0}
                component="form"
                onSubmit={handleSubmit}
            >   
                <Typography variant="h5" fontWeight={500}>Profession</Typography>
                <Autocomplete 
                    sx={{ pt: 1 }}
                    value={profession}
                    // multiple={true}
                    placeholder="Select your profession..."
                    onChange={(e, newVal) => setProfession(newVal)}
                    options={professions}
                    size="small"
                    autoHighlight
                    renderInput={ params => <TextField {...params} required /> }
                />
                
                <Box sx={{ pt: 4 }}>
                    <Typography variant="h5" fontWeight={500} >
                        Skills
                    </Typography>
                    
                    <Stack direction="row" gap={1} flexWrap="wrap" pt={1}>
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
                                setSkill((currentList) => [
                                    ...currentList,
                                    addSkill,
                                ]);
                                setAddSkill("");
                            }}
                            variant="contained"
                            color="info"
                            startIcon={<PlaylistAddRoundedIcon />}
                        >
                            Add
                        </Button>
                    </Stack>
                </Box>

                <Box sx={{ pt: 4 }}>
                    <Typography variant="h5" fontWeight={500} >
                        About
                    </Typography>

                    <TextField 
                        multiline
                        minRows={ mobile ? 4 : 8 }
                        fullWidth
                        value={about}
                        onChange={handleChange}
                        color="info"
                        placeholder="Write about yourself in less than 100words to impress your mentees..."
                        required
                        sx={{ pt: 2, whiteSpace: "pre-wrap" }}
                    />
                </Box>
                

                <Box textAlign="right" pt={2} pb={3} >
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        loading={loading}
                        type="submit"
                        sx={{ width: "50%" }}
                    >
                        {loading ? "loading" : "Update"}
                    </LoadingButton>
                </Box>
            </Paper>
        </React.Fragment>
    )
}

const ProfileImage = ({ userAlt, profileImage, previewImg }) => {
    return (
        <React.Fragment>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "start", sm: "end" }}
                gap={2}
                pt={5}
                pb={5}
            >
                <Avatar
                    src={profileImage}
                    alt={userAlt}
                    sx={{ height: 150, width: 150 }}
                    // variant="rounded"
                />

                <Box>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={previewImg}
                        />
                        <Button
                            endIcon={<InsertPhotoOutlinedIcon />}
                            component="span"
                            variant="outlined"
                            color="info"
                        >
                            Upload
                        </Button>
                    </label>
                </Box>
            </Stack>
        </React.Fragment>
    );
};

export default Settings;
