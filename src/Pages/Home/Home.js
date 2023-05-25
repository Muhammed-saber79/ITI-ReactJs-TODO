import { Link } from "react-router-dom";
import Button from "./../../Shared/Button/Button";
import axiosInstance from "./../../Axios/Axios";
import { useState, useEffect } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Delete from "../../Components/Delete/Delete";
import Details from "../../Components/Details/Details";
import Edit from "../../Components/Edit/Edit";

const Home = ()=>{
    const [tasks, setTasks] = useState(null);

    useEffect(()=>{
        getAllTasks()
    }, [])

    const getAllTasks = async()=>{
        await axiosInstance.get("/tasks")
        .then((response)=>{
            setTasks(response.data);
        })
        .catch((error)=>{
            // alert(error);
        })
    }

    const handleDeleteTask = (task)=>{
        const updated = tasks.filter((x)=> x !== task)
        setTasks(updated);
    }

    const handleUpdateTask = ()=>{
        getAllTasks();
    }

    return tasks ? (
        <div className="container">
            <div className="row">
                <div className="container col-sm-12 col-md-12 col-lg-9 mx-auto">
                    <div className="row">
                        {
                            tasks.map((task)=>(
                                <div key={ task.id }>
                                    <div className="d-flex justify-content-between flex-wrap my-3"> 
                                        <div className="col-sm-12 col-md-6 col-lg-4 text-center my-2">
                                            <p className="my-auto text-center">{ task.name }</p>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-4 text-center my-2">
                                            <p className="my-auto text-center text-info">{ task.updated_at.trim().length !== 0 ? task.updated_at :task.created_at }</p>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-4 text-center my-2">
                                            <Details task={task} />
                                            &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                                            <Delete id={ task.id } onDelete={()=>handleDeleteTask(task)} />
                                            &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                                            <Edit id={task.id} onUpdated={()=>handleUpdateTask()} />
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
    :
    (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            <br/>
            <h4>Loading...</h4>
        </div>
    )
}

export default Home;