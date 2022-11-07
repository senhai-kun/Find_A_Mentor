import { CircularProgress, Typography, Box } from '@mui/material'
import React from 'react'

const PageLoader = () => {
  return (
    <Box height='70vh' display='flex' alignItems='center' justifyContent='center' gap={2} >
        <CircularProgress />
        <Typography align='center' > Please Wait....</Typography>
    </Box>
  )
}

export default PageLoader