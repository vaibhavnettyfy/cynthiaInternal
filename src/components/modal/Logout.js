import React from 'react'
import { DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CommonButton from '../../components/common/Button'
const Logout = ({ handleClose }) => {
    // const navigate = useNavigate();
    return (
        <div>
            <DialogTitle sx={{ m: 0, p: 2 }} id="Common_modal">
                Logout
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Typography>Do you want to logout from this Web? </Typography>
            </DialogContent>
            <DialogActions>
                <CommonButton buttonName='Cancel' variant='outlined' onClick={handleClose} />
                <CommonButton buttonName='Logout' />
            </DialogActions>
        </div>
    )
}

export default Logout