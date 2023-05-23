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
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../Axios/Axios';

const Delete = (props)=>{
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (e)=>{
        console.log("testtt...!" + props.id);
        try{
            await axiosInstance.delete(`/tasks/${props.id}`);
        }catch(error){
            alert(error);
        }
        props.onDelete();
        setOpen(false);
    }

    return (
        <>
            {/* <MyButton color="danger" icon="trash" onClick={handleClickOpen} /> */}

            <Button onClick={handleClickOpen} className='btn btn-icon btn-light text-danger rounded-pill shadow bg-body-tertiary rounded'>
                <FontAwesomeIcon icon={ faTrash }/>
            </Button>

            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" className='text-warning bg-danger mb-3'>
                    Delete Task
                </DialogTitle>

                <DialogContent className='my-3'>
                    <DialogContentText>
                        Are You Sure To Delete This Task?
                    </DialogContentText>
                </DialogContent>
                <hr className='my-3' />
                <DialogActions>
                    <Button autoFocus onClick={handleClose} className='btn btn-icon btn-light text-secondary rounded-pill shadow bg-body-tertiary rounded'> 
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} autoFocus className='btn btn-icon btn-light text-danger rounded-pill shadow bg-body-tertiary rounded'>
                        Delete 
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Delete;

