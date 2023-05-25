import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState, useEffect} from 'react';
import Button from '../Button/Button';
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./../../Axios/Axios";

const Form = (props) => {
    // ===============> States <===================
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [taskId, setTaskId] = useState(0);
    const [formErrors, setFormErrors] = useState({
        nameErr: "",
    });
    const [task, setTask] = useState({
        id: 0,
        name: "",
        created_at: currentDateTime.toLocaleString(),
        updated_at: ""
    });
    // ===============> End States <================

    // ===============> Effects <===================
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    })
    // ===============> End Effects <===============

    // ===============> Event Handling <===================
    const handleOnChange = (e)=>{
        e.preventDefault();

        setTaskId(taskId+1);
        setTask({
            ...task,
            id: taskId,
            name: e.target.value,
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
            
            if(task.name === ""){
                setFormErrors({
                    nameErr: "Task name required...!"
                })
            }else{
                if(formErrors.nameErr.length === 0){
                    await storeTask().then(()=>{
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
        
        if(task.name === ""){
            setFormErrors({
                nameErr: "Task name required...!"
            })
        }else{
            if(formErrors.nameErr.length === 0){
                await storeTask().then(()=>{
                    navigate('/');
                }).catch((error)=>{alert(error)})
            }else{
                e.preventDefault();
            }
        }
    }

    // ===============> Event Handling <==============

    // ===============> Store Data <===================
    const storeTask = async()=>{
        try{
            await axiosInstance.post("/tasks", task);
        }catch(error){
            // alert(error.message);
            if(error.message == "Request failed with status code 500"){
                navigate('/');
            }
        }
    }
    // ===============> End Store Data <===================

    return (
        <div className='mx-auto'>
            <TextField
                id="outlined-multiline-static"
                label="Add Task"
                multiline
                rows={4}
                placeholder="Type Your Task Here..."
                className='w-100'
                onChange={handleOnChange}
                onKeyDown={handleOnEnter}
            />
            <br/>
            <small className="text-danger">{formErrors.nameErr}</small>
            <div className='d-flex justify-content-between my-3 align-items-middle'>
                <div className='text-info'>{ currentDateTime.toLocaleString() }</div>
                <div>
                    <Button url='/' color="primary" word="Add" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Form;