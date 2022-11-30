import { Typography } from '@mui/material'
import React from 'react'

const WhiteText = (props) => {
  return (
    <Typography {...props} color="white" >{props.children}</Typography>
  )
}

export default WhiteText