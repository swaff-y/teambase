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

  return(
    <div className="content__taskBar">
      <div className="content__taskBarContents">
        <span id="name">{props.task.name}</span>
        <span id="status">{props.task.status}</span>
        <span id="dueDate">{props.task.due_date}</span>
        <span id="progress"><LinearProgress variant="determinate" value={props.task.progress} style={{height:'15px', borderRadius:'3px'}}/></span>
        <span id="users">
          {
            props.task.users.map((user,index)=><UserStack key={index} user={user}/>)
          }
        </span>
        <div className="content__taskBarIcons">
          <IconButton
            style={iconStyle}
            onClick={()=>props.handleTaskEdit(props.task.id)}
          >
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton
            style={iconStyle}
            onClick={()=>props.handleTaskNote(props.task.id)}
          >
            <EventNoteIcon fontSize="small"/>
          </IconButton>
          <IconButton
            style={iconStyle} onClick={()=>props.handleTaskDelete(props.task.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default TaskBar;
