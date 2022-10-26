import { Container, Typography } from "@mui/material";
import React from "react";
import notFound from "../asset/404.gif"
import AppbarSpace from "../reusable/AppbarSpace";

const NotFound = () => {

    return (
        <Container sx={{ textAlign: "center" }} >
            <AppbarSpace />
            <img 
                alt="404 not found"
                width="80%"

                src={notFound}
            />
            <Typography>The page you're looking for is not here, but don't worry we've hired our best detectives to find it.</Typography>
            <Typography>Go back to </Typography> <Typography component="a" color="primary" href="/" > Home.</Typography>
        </Container>
    );
};

export default NotFound;