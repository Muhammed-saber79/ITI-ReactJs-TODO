import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MyButton from "../../Shared/Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

const Details = (props)=>{
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen} className='btn btn-icon btn-light text-info rounded-pill shadow bg-body-tertiary rounded'>
                <FontAwesomeIcon icon={ faInfo }/>
            </Button>

            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" className='text-primary bg-info mb-3'>
                    Task Info
                </DialogTitle>

                <DialogContent className='my-3'>
                    {/* <DialogContentText> */}
                        <h5>Task ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ props.task.id }</h5>
                        <h5>Task Name: &nbsp;&nbsp;{ props.task.name }</h5>
                        <h5>Task Date: &nbsp;&nbsp;&nbsp;&nbsp;{ props.task.updated_at.trim().length !== 0 ? props.task.updated_at :props.task.created_at }</h5>
                    {/* </DialogContentText> */}
                </DialogContent>
                <hr className='my-3' />
                <DialogActions>
                    <Button autoFocus onClick={handleClose} className='btn btn-icon btn-light text-info rounded-pill shadow bg-body-tertiary rounded'> 
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Details;

