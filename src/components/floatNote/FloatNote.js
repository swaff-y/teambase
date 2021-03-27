import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import "./floatnote.css";

const FloatNote = (props) => {
  return(
    <div
      className="floatnote"
      style={{
        display:props.floatNote
      }}
    >

      <CloseIcon
        onClick={props.closeFloatNote}
        fontSize="small"
        style={{
          position:'absolute',
          right: '0px',
          color:'#000000',
          marginTop: '20px',
          marginRight:'20px'
        }}/>

        <div className="floatnotetask__container">
          <h1>TASK NOTE</h1>

          <p>Task Name</p>

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
            onClick=""
          >
            Delete
          </Button>
        </div>

    </div>
  )
}

export default FloatNote;
