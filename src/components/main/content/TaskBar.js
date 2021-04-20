// import React, {useEffect, useState} from 'react';
import UserStack from './UserStack'
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DeleteIcon from '@material-ui/icons/Delete';
// import api from '../../../api';
import "./content.css";

const TaskBar = (props) => {

  const iconStyle = {
    color: "#6686CC"
  }

  const formatDate = (date) => {
    console.log("The date",date);
    const year = new Date(date).getFullYear();
    let month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    if(month.toString().length === 1){
      month = "0" + month.toString();
    }

    return [year, month, day].join('-');
  }

  return(
    <div className="content__taskBar" ref={props.innerRef} {...props.drags} {...props.handles}>
      <div className="content__taskBarContents">
        <span id="name">{props.name}</span>
        <span id="status">{props.status}</span>
        <span id="dueDate">{formatDate(props.dueDate)}</span>
        <span id="progress"><LinearProgress variant="determinate" value={props.progress} style={{height:'15px', borderRadius:'3px'}}/></span>
        <span id="users">
          {
            props.users.map((user,index)=><UserStack key={index} user={user}/>)
          }
        </span>
        <div className="content__taskBarIcons">
          <IconButton
            style={iconStyle}
            onClick={()=>props.handleTaskEdit(props.id)}
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            style={iconStyle}
            onClick={()=>props.handleTaskNote(props.id)}
          >
            <EventNoteIcon fontSize="small"/>
          </IconButton>
          <IconButton
            style={iconStyle} onClick={()=>props.handleTaskDelete(props.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default TaskBar;
