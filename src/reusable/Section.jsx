import { Box, Divider, Typography } from '@mui/material';
import React from 'react'

const Section = ({ title, subtitle, children }) => {
    return (
        <Box width="100%" >
            <Typography variant="h5" fontWeight="bold" mb={1} >
                {title}
            </Typography>

            <Divider />

            <Box maxHeight="800px" overflow="auto" p={1} > 
                <Typography variant="h6" fontWeight={500} mb={1} mt={5}>
                    {subtitle}
                </Typography>
                {children}
            </Box>

        </Box>
    );
};

export default Section