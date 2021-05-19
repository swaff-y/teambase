// import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import api from '../../api';
import { authHeaders } from '../../authUtils';

import "./floatdeletetask.css";

const FloatTaskDelete = (props) => {

  const deleteTask = () => {
    api.delete(`/task-delete/${props.taskId}`,{
      headers: authHeaders()
    })
    .then(res=>{
      console.log(res.data);
      props.closeFloatTaskDelete()
    })
    .catch(err=>{
      console.warn(err);
    })
  }

  return(
    <div
      className="floatdeletetask"
      style={{
      display:props.floatTaskDelete
    }}
    >

      <IconButton
        onClick={props.closeFloatTaskDelete}
        style={{
          position:'absolute',
          right: '0px',
          color:'##6686CC',
          marginTop: '20px',
          marginRight:'20px'
        }}
      >
        <CloseIcon
          fontSize="small"
          style={{
            color:'#000000',
          }}/>
      </IconButton>

      <div className="floatdeletetask__container">
        <h1>DELETE TASK</h1>

        <p>Are you sure you want to delete this task?</p>

        <Button
          variant="contained"
          color="primary"
          style={{marginRight:"20px"}}
          startIcon={<ExitToAppIcon />}
          onClick={props.closeFloatTaskDelete}
        >
          Return
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={deleteTask}
        >
          Delete
        </Button>
      </div>

    </div>
  )
}

export default FloatTaskDelete;
