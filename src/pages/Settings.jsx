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
} from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AppbarSpace from "../utils/AppbarSpace";
import { useDispatch, useSelector } from "react-redux";
import {
    loadComponent,
    uploadImage,
    userData,
} from "../redux/slicer/userSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "../components/Header";

const Input = styled("input")({
    display: "none",
});


const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector(userData);
    const loading = useSelector(loadComponent);

    const [isMentor, setIsMentor] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        setProfileImage(user?.img);
    }, [user]);

    const previewImg = (e) => {
        const reader = new FileReader();

        reader.onloadend = (e) => {
            setProfileImage(e.target.result);
            // console.log(e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const uploadImg = () => {
        if (user.img !== profileImage) {
            dispatch(uploadImage(profileImage));
        }
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
                            bgcolor: "inherit",
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
                                        value={user?.firstname}
                                        fullWidth
                                        size="small"
                                    />
                                </Box>
                                <Box width="100%">
                                    <Typography fontWeight={300}>
                                        Last name
                                    </Typography>
                                    <TextField
                                        value={user?.lastname}
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

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            mt={2}
                            gap={2}
                            alignItems="center"
                        >
                            <Box width="100%">
                                <Typography fontWeight={300}>
                                    Birthdate
                                </Typography>
                                <TextField
                                    type="date"
                                    size="small"
                                    defaultValue="2000-10-23"
                                />
                            </Box>
                        </Stack>

                        <ProfileImage
                            profileImage={profileImage}
                            previewImg={previewImg}
                        />

                        <Divider />

                        <Stack direction="row" pt={2} pb={3} gap={2}>
                            <LoadingButton
                                fullWidth
                                variant="contained"
                                onClick={uploadImg}
                                loading={loading}
                            >
                                {loading ? "loading" : "Save"}
                            </LoadingButton>

                            <Button fullWidth variant="outlined" color="error">
                                Cancel
                            </Button>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        </React.Fragment>
    );
};

const ProfileImage = ({ profileImage, previewImg }) => {
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
                    alt="asd"
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
