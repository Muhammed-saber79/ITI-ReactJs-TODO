import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../Axios/Axios';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

const Delete = (props)=>{
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [oldTask, setOldTask] = useState({
        id: "",
        name: "",
        created_at: "",
        updated_at: "",
    });
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [formErrors, setFormErrors] = useState({
        nameErr: "",
    });

    useEffect(()=>{
        getOldTaskData();

        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    const getOldTaskData = async ()=>{
        try{
            const res = await axiosInstance.get(`/tasks/${props.id}`)
            setOldTask(res.data);
        }catch(error){
            alert(error);
        }
    }

    // ===============> Event Handling <===================
    const handleOnChange = (e)=>{
        e.preventDefault();

        setOldTask({
            ...oldTask,
            name: e.target.value,
            updated_at: currentDateTime.toLocaleString()
        })

        setFormErrors({
            nameErr: e.target.value.trim() === '' ? "Task name required...!" :
                     e.target.value.length < 5 ? "Task name must be more than 5 chars...!" : 
                     e.target.value.length > 100 ? "Must be less than 100 chars...!" : "",
        })
    }

    const navigate = useNavigate();
    const handleOnEnter = async (e)=>{
        if(e.keyCode == 13){
            e.preventDefault();
            
            if(oldTask.name === ""){
                setFormErrors({
                    nameErr: "Task name required...!"
                })
            }else{
                if(formErrors.nameErr.length === 0){
                    console.log("success");
                    await updateTask().then(()=>{
                        handleClose();
                        navigate('/');
                    }).catch((error)=>{alert(error)})
                }else{
                    e.preventDefault();
                }
            }
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if(oldTask.name === ""){
            setFormErrors({
                nameErr: "Task name required...!"
            })
        }else{
            if(formErrors.nameErr.length === 0){
                console.log("success");
                await updateTask().then(()=>{
                    handleClose();
                    navigate('/');
                }).catch((error)=>{alert(error)})
            }else{
                e.preventDefault();
            }
        }
    }

    // ===============> Event Handling <==============

    // ===============> Update Date <===================
    const updateTask = async()=>{
        try{
            await axiosInstance.put(`/tasks/${oldTask.id}`, oldTask)
        }catch(error){
            alert(error.message);
        }
    }
    // ===============> End Update Date <===================

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.onUpdated();
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen} className='btn btn-icon btn-light text-success rounded-pill shadow bg-body-tertiary rounded'>
                <FontAwesomeIcon icon={ faPen }/>
            </Button>

            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" className='text-info bg-success'>
                    Edit Task Info
                </DialogTitle>
                <br/>    
                <DialogContent className='my-1' style={{ width: "350px" }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Edit Task"
                        multiline
                        rows={4}
                        placeholder="Type Your Task Here..."
                        className='w-100'
                        onChange={handleOnChange}
                        onKeyDown={handleOnEnter}
                        defaultValue={ oldTask.name }
                    />
                    <small className="text-danger">{formErrors.nameErr}</small>
                    <div className='text-success'>
                        <span className='fw-bold'>Created at: &nbsp;&nbsp;&nbsp;</span> 
                        { oldTask.created_at.toLocaleString() }
                    </div>
                    <div className='text-success'>
                        <span className='fw-bold'>Updated at: &nbsp;&nbsp;&nbsp;</span> 
                        { oldTask.updated_at.toLocaleString() }
                    </div>

                    <div className='text-info mt-3'>
                        <span className='fw-bold'>Current Time: &nbsp;&nbsp;&nbsp;</span> 
                        { currentDateTime.toLocaleString() }
                    </div>
                </DialogContent>
                <hr className='my-3' />
                <DialogActions>
                    <Button autoFocus onClick={handleClose} className='btn btn-icon btn-light text-secondary rounded-pill shadow bg-body-tertiary rounded'> 
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} autoFocus className='btn btn-icon btn-light text-success rounded-pill shadow bg-body-tertiary rounded'>
                        Update 
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Delete;

