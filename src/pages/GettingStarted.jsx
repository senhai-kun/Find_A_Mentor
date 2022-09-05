import React, { useState } from "react";
import {
    Box,
    Button,
    Chip,
    Container,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AppbarSpace from "../utils/AppbarSpace";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const GettingStarted = () => {
    const [category, setCategory] = useState("");
    const [skill, setSkill] = useState([]);
    const [addSkill, setAddSkill] = useState("");

    const handleDeleteSkill = (indexToDelete) => {
        setSkill( currentList => currentList.filter( (_, index) => indexToDelete !== index ) )
    }

    return (
        <React.Fragment>
            <AppbarSpace divider />

            <Container sx={{ p: 2 }}>
                <Typography variant="h3" fontWeight="bold" pt={4}>
                    Getting Started
                </Typography>

                <Box pt={5}>
                    <Typography variant="h4" >
                        What is your Field Expertise?
                    </Typography>

                    <TextField
                        size="small"
                        select
                        sx={{ pt: 3 }}
                        // SelectProps={
                        //     {
                        //         // sx: { borderRadius: 10, fontWeight: 300 },
                        //         // multiple: true
                        //     }
                        // }
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                    >
                        <MenuItem autoFocus={false} divider value="All">
                            Please select your category
                        </MenuItem>
                        <MenuItem value="Engineering">Engineering</MenuItem>
                        <MenuItem value="Information Technology">
                            Information Technology
                        </MenuItem>
                        <MenuItem value="Business & Management">
                            Business & Management
                        </MenuItem>
                        <MenuItem value="Product & Marketing">
                            Product & Marketing
                        </MenuItem>

                        <Stack pl={2} pr={2} pt={1} gap={2}>
                            <TextField
                                size="small"
                                placeholder="Your field is not on the list? Enter it here."
                            />

                            <Button variant="contained" color="info">
                                Add
                            </Button>
                        </Stack>
                    </TextField>
                </Box>

                <Box pt={5}>
                    <Typography variant="h4" >
                        What are your Skills?
                    </Typography>
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

                <Box pt={5}>
                    <Typography variant="h3">Tell us About Yourself</Typography>

                    <TextField 
                        multiline
                        minRows={10}
                        fullWidth
                        sx={{ pt: 3 }}
                        color="info"
                    />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default GettingStarted;
