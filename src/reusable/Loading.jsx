import React from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Container >
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
        }}>

            <CircularProgress color='primary' />

            <Typography pl={3} >Loading...</Typography>

        </Box>

    </Container>
  )
}

export default Loading;