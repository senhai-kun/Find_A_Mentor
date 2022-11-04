import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CloseIcon from '@mui/icons-material/Close';

const AlertMessage = ({ open, close, errorMsg, setErrorMsg }) => {
    const navigate = useNavigate();

    const onCloseAlert = () => {
        close(false)
        setErrorMsg("")
    }

    const goToLogin = () => {
        navigate("/account/login")
    }

    return (
        <Dialog open={open} onClose={onCloseAlert} fullWidth>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onCloseAlert}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center'}}>

            <WarningRoundedIcon color="warning" sx={{ fontSize: 70 }} />

            <Typography variant="h5"  fontWeight="300" pb={2}>There was an Error!</Typography>
            <Typography variant="h4" fontWeight="500" pb={3}>{errorMsg}</Typography>

            </DialogContent>
            <DialogActions sx={{ bgcolor: (theme) => theme.palette.warning.main }} >
                <Button onClick={goToLogin} color='inherit'>Login Instead?</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertMessage;