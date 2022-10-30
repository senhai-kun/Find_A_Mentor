import React from 'react'
import { Box, Typography } from '@mui/material'

const Message = ({ msg, align, variant }) => {
  return (
    <Box textAlign={align} >
        <Typography variant={variant} color="warning" >
            {msg}
        </Typography>
    </Box>
  )
}

export default Message