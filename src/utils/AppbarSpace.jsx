import { Box, Divider } from "@mui/material";
import React from "react";

const AppbarSpace = ({ color, divider }) => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    height: (theme) => theme.mixins.toolbar.minHeight,
                    backgroundColor: color,
                }}
                // bgcolor={bgColor ? bgColor : "inherit"}
            ></Box>

            {divider && <Divider sx={{ mt: { xs: 0, sm: 1 } }} />}
        </React.Fragment>
    );
};

export default AppbarSpace;
