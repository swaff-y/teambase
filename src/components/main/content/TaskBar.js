import React, {useEffect, useState} from 'react';
import UserStack from './UserStack'
import LinearProgress from '@material-ui/core/LinearProgress';
import api from '../../../api';
import "./content.css";

const TaskBar = (props) => {

  // const [selectedTask,setSelectedTask] = useState({users:[{}]})

  // useEffect(()=>{
  //   api.get(`task-users/${props.id}`)
  //   .then(res=>{
  //     if(res.data !== null){
  //       setSelectedTask(res.data);
  //     }
  //   })
  //   .catch(err=>{
  //     console.warn(err);
  //   })
  // },[props.selectedProject]);

  return(
    <div className="content__taskBar">
      <div className="content__taskBarContents">
        <span id="name">{props.task.name}</span>
        <span id="status">{props.task.status}</span>
        <span id="dueDate">{props.task.due_date}</span>
        <span id="progress"><LinearProgress variant="determinate" value={50} style={{height:'15px', borderRadius:'3px'}}/></span>
        <span id="users">
          {
            props.task.users.map((user,index)=><UserStack user={user}/>)
          }
        </span>
      </div>
    </div>
  )
}

export default TaskBar;
