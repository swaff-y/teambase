import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../api';
import "./floatnote.css";

const FloatNote = (props) => {
  const [name, setName] = useState();

  useEffect(()=>{
    api.get(`/task-read/${props.taskId}`)
    .then(res=>{
      setName(res.data.name);
    })
    .catch(err=>{
      console.warn(err);
    })
  },[props.floatNote]);

  return(
    <div
      className="floatnote"
      style={{
        display:props.floatNote
      }}
    >
      <IconButton
        onClick={props.closeFloatNote}
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

        <div className="floatnotetask__container">
          <h1>TASK NOTE</h1>

          <h3>Task Name</h3>
          <p>{name}</p>

          <textarea className="floatnotetask__textArea">
          </textarea>

          <div className="floatnotetask__buttonContainer">
            <Button
              variant="contained"
              color="primary"
              style={{marginRight:"20px"}}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              onClick={props.closeFloatNote}
            >
              Return
            </Button>
          </div>

        </div>

    </div>
  )
}

export default FloatNote;
