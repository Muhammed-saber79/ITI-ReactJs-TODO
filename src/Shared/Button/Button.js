import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faInfo, faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const Buttont = (props)=>{
    const [icon, setIcon] = useState('');
    const [word, setWord] = useState('');

    useEffect(()=>{
        const icon = props.icon;
        setIcon(icon);

        const word = props.word;
        setWord(word);
    })

    return (
        <Link to={{ pathname: props.url, state: { task: props.task } }}>
            <Button onClick={props.onClick} className={`btn btn-icon btn-light text-${props.color ? props.color:'' } rounded-pill shadow bg-body-tertiary rounded`}>
                { icon == 'plus' ? <FontAwesomeIcon icon={ faPlus } /> : '' }
                { icon == 'trash' ? <FontAwesomeIcon icon={ faTrash } /> : '' }
                { icon == 'info' ? <FontAwesomeIcon icon={ faInfo } /> : '' }
                { word != '' ? word : '' }
            </Button>
        </Link>
    )
}

export default Buttont;