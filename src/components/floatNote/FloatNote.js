import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../api';
import "./floatnote.css";
import { authHeaders } from '../../authUtils';

const FloatNote = (props) => {
  const [name, setName] = useState();
  const [text, setText] = useState("");

  useEffect(()=>{
    if(props.taskId !== undefined){
      api.get(`/task-read/${props.taskId}`,{
        headers: authHeaders()
      })
      .then(res=>{
        setName(res.data.name);
      })
      .catch(err=>{
        console.warn(err);
      })
    }
  },[props.floatNote]);

  const handleText = (e) => {
    setText(e.target.value);
  }
  const handleClose = () => {
    setText("");
    props.closeFloatNote();
  }

  const saveNote = () => {
    api.post(`/note-create/${props.taskId}/${props.user}`,{
      note:text
    })
    .then(res=>{
      setText("");
      props.closeFloatNote();
    })
    .catch(err=>{
      console.warn(err);
    })
  }

  return(
    <div
      className="floatnote"
      style={{
        display:props.floatNote
      }}
    >
      <IconButton
        onClick={handleClose}
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

          <textarea
            className="floatnotetask__textArea"
            onChange={handleText}
            value={text}
          >
          </textarea>

          <div className="floatnotetask__buttonContainer">
            <Button
              onClick={saveNote}
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
              onClick={handleClose}
            >
              Return
            </Button>
          </div>

        </div>

    </div>
  )
}

export default FloatNote;
