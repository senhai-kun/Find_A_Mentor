import { Box, Divider } from "@mui/material";
import React from "react";

const AppbarSpace = ({ color, divider, disable }) => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    height: (theme) => theme.mixins.toolbar.minHeight,
                    backgroundColor: color,
                }}
            ></Box>

            <Divider sx={{ mt: { xs: 0, sm: 1 }, display: divider ? "block" : "none" }} />
        </React.Fragment>
    );
};

export default AppbarSpace;
