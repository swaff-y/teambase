import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import FloatTaskAdd from './FloatTaskAdd';
import FloatTaskEdit from './FloatTaskEdit';
import IconButton from '@material-ui/core/IconButton';

import "./floatbar.css";

const FloatTaskBar = (props) => {


  return(
    <div
      className="floatbar"
      style={{
      display:props.floatStatus
    }}>
      {
        props.edit === true
        ?
        <h1 className="floatbar__heading">Edit Task</h1>
        :
        <h1 className="floatbar__heading">Add Task</h1>
      }

      <IconButton
        onClick={props.closeFloatTaskBar}
        style={{
          position:'absolute',
          right: '0px',
          color:'##6686CC',
          marginTop: '-70px',
          marginRight:'20px'
        }}
      >
        <CloseIcon
          fontSize="small"
          style={{
            color:'#000000',
          }}/>
      </IconButton>

      {
        props.edit === true
        ?
        <FloatTaskEdit
          floatStatus={props.floatStatus}
          closeFloatTaskBar={props.closeFloatTaskBar}
          selectedProject={props.selectedProject}
          user={props.user}
          taskId={props.taskId}
        />
        :
        <FloatTaskAdd
          floatStatus={props.floatStatus}
          closeFloatTaskBar={props.closeFloatTaskBar}
          selectedProject={props.selectedProject}
          user={props.user}
        />
      }


    </div>
  )
}

export default FloatTaskBar;
