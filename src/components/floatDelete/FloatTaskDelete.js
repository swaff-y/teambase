import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import "./floatdeletetask.css";

const FloatTaskDelete = (props) => {
  return(
    <div
      className="floatdeletetask"
      style={{
      display:props.floatTaskDelete
    }}
    >
      <CloseIcon
        onClick={props.closeFloatTaskDelete}
        fontSize="medium"
        style={{
          position:'absolute',
          right: '0px',
          color:'#000000',
          marginTop: '20px',
          marginRight:'20px'
        }}/>

      <h1>DELETE TASK</h1>

      <p>Are you sure you want to delete this task?</p>

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>

    </div>
  )
}

export default FloatTaskDelete;
