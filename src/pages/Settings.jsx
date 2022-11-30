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
    Chip,
    useMediaQuery,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
} from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AppbarSpace from "../reusable/AppbarSpace";
import { useDispatch, useSelector } from "react-redux";
import {
    setUser,
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
import { useFormik } from "formik";
import * as yup from "yup";
import { useCallback } from "react";

const Input = styled("input")({
    display: "none",
});


const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector(userData);
    // const loading = useSelector(loadComponent);
    const [loading, setLoading] = useState(false);
    const [openChangePass, setOpenChangePass] = useState(false);

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
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("")

    useEffect(() => {
        setProfileImage(user?.img);
        // if (user.coordinates) {
        //     setLocation(user.coordinates)
        // }
        setFirstname(user?.firstname);
        setLastname(user?.lastname);
        setPhone(user?.phone);
        setBirthday(user?.birthday);
    }, [user]);

    const previewImg = (e) => {
        const reader = new FileReader();

        reader.onloadend = (e) => {
            setProfileImage(e.target.result);
            // console.log(e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        console.log("save");
        setLoading(true)
        try {
            const result = await axios.post(
                `${baseUrl}/account/update_profile`,
                { ismentor: user?.ismentor, img: profileImage, firstname, lastname, location, ref_id: user?.ref_id, phone, birthday },
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
  
    };

    return (
        <React.Fragment>
            <Header title="Settings - Account" />
            <AppbarSpace color="#f2f4fb" />

            <Box bgcolor="#f2f4fb" pb={10} component="form" onSubmit={saveProfile}>
                <Container sx={{ pt: { xs: 5, sm: 8 } }}>
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
                            
                            <Stack direction="row" gap={2} alignItems="end" justifyContent="space-between" flexWrap="wrap" >
                                <Box mt={2}>
                                    <Typography fontWeight={300}>Phone Number</Typography>
                                    <TextField
                                        placeholder="Ex. 0999 123 2341"
                                        size="small"
                                        type="number"
                                        value={phone}
                                        onChange={ e => setPhone(e.target.value) }
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +63
                                                </InputAdornment>
                                            ),
                                        }}
                                        inputProps={{
                                            inputMode: "numeric",
                                            maxLength: 11,
                                        }}
                                        required
                                    />
                                </Box>
                                <Box mt={2}>
                                    <Typography fontWeight={300}>Birthday</Typography>
                                    <TextField
                                        type="date"
                                        value={birthday}
                                        onChange={ (e) => {
                                            setBirthday(e.target.value);
                                        }}
                                        size="small"
                                    />
                                </Box>
                                <Box mt={2} textAlign="right" >
                                    <Button variant="contained" color="info" onClick={ () => setOpenChangePass(true) } >Change Password</Button>
                                </Box>
                            </Stack>
                            
                        </Box>

                        <ProfileImage
                            userAlt={user?.firstname}
                            profileImage={profileImage}
                            previewImg={previewImg}
                        />

                        <LocationSettings user={user} location={location} setLocation={setLocation} />

                        <Divider sx={{ pb: 3 }} />

                        <Stack direction="row" pt={2} pb={3} gap={2}>
                            <LoadingButton
                                fullWidth
                                variant="contained"
                                // onClick={saveProfile}
                                type="submit"
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
            
            <ChangePassword open={openChangePass} toggle={setOpenChangePass} />
        </React.Fragment>
    );
};

const ChangePassword = ({ open, toggle }) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const validation = yup.object({
        currentPassword: yup
            .string("Enter your password")
            .min(3, "Password should be of minimum 3 characters length")
            .required("Password is required")
            .matches(/^\S*$/, "Spaces are not valid"),
        newPassword: yup
            .string("Enter your password")
            .min(3, "Password should be of minimum 3 characters length")
            .required("Password is required")
            .matches(/^\S*$/, "Spaces are not valid")
            .notOneOf([yup.ref("currentPassword")], "New Password must not match the old password"),
        confirmNewPassword: yup
            .string("Enter your password")
            .min(3, "Password should be of minimum 3 characters length")
            .oneOf([yup.ref("newPassword")], "New Password not matched!")
            .required("Enter again your new password to confirm")
    })

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        },
        validationSchema: validation,
        onSubmit: async (val, { setFieldError, resetForm }) => {
            setLoading(true);
            try {
                const res = await axios.post(
                    `${baseUrl}/account/change_password`, { ...val },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                        },
                        withCredentials: true,
                    }
                );
                if ( !res.data.success ) { // there was a field error
                    setFieldError(res.data.params, res.data.errorMsg); 
                } else {
                    // all done here!
                    setOpenAlert(true);
                    handleClose(); // close dialog
                    resetForm();
                }
                
            } catch (error) {
                alert(`Please refresh the page. There was an error: ${error}`)
            } finally {
                setLoading(false)
            }
        }
    })

    const handleClose = () => {
        toggle(false);
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <DialogTitle id="alert-dialog-title">
                    Change Password
                </DialogTitle>
                <DialogContent dividers >
                    <TextField 
                        label="Current Password"
                        variant="outlined"
                        fullWidth
                        name="currentPassword"
                        type="password"
                        sx={{ mt: 2 }}
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.currentPassword &&
                            Boolean(formik.errors.currentPassword)
                        }
                        helperText={
                            formik.touched.currentPassword &&
                            formik.errors.currentPassword
                        }
                    />

                    <TextField 
                        label="Enter New Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        name="newPassword"
                        sx={{ mt: 5 }}
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
                        variant="outlined"
                        fullWidth
                        type="password"
                        name="confirmNewPassword"
                        sx={{ mt: 2 }}
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.confirmNewPassword &&
                            Boolean(formik.errors.confirmNewPassword)
                        }
                        helperText={
                            formik.touched.confirmNewPassword &&
                            formik.errors.confirmNewPassword
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit" >Close</Button>
                    <LoadingButton loading={loading} type="submit" variant="contained" >
                        Submit
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            
            <Snackbar open={openAlert} autoHideDuration={10000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert variant="filled" onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
                    Your Password has been changed!
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

const LocationSettings = ({ user, location, setLocation }) => {
    const [addressQuery, setAddressQuery] = useState("");
    const [select, setSelect] = useState("")
    const [addressList, setAddressList] = useState([{
        address: ""
    }]);

    useEffect( () => {
        const source = axios.CancelToken.source();

        const searchAddress = async () => {
            const res = await axios.get(`${baseUrl}/location/search?addressQuery=${addressQuery}`, { cancelToken: source.token });

            setAddressList(res.data.locations)
            // console.log(res.data)
        } 

        searchAddress()

        return () => {
            source.cancel("query changed, cancel fetching addresses...")
        }


    }, [addressQuery])

    console.log("select", select);

    return (
        <React.Fragment>
            <Typography variant="h6" fontWeight={300}>
                Location
            </Typography>

            <Autocomplete 
                size="small"
                sx={{ textAlign: "right" }}
                freeSolo
                // value={addressQuery}
                getOptionLabel={(option) => option.address}
                options={addressList}
                onChange={ (e, value) => {
                    setSelect(value);
                    setLocation(value.coordinates)
                }}
                renderInput={ props => 
                    <TextField 
                        {...props} 
                        sx={{ width: "50%" }}
                        placeholder="Search place..." 
                        value={addressQuery}
                        onChange={ e => setAddressQuery(e.target.value)}
                    /> 
                }
                renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.index}>
                        {option.address}
                      </li>
                    );
                }}
            />

            <SettingLocation defaultAddress={user?.coordinates?.address} location={location} setLocation={setLocation} />

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
