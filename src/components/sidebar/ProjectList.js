// import React, {useEffect, useState} from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import "./sidebar.css";

const ProjectList = (props) => {

  const handleClick = () => {
    props.handleClick(props.name,props.id);
  }

  return(
    <li
      onClick={handleClick}
      ref={props.innerRef} {...props.drags} {...props.handles}
    >
      <ArrowForwardIcon
      fontSize="small"
      style={{
        color:'white',
        position:'relative',
        top:'7px',
        left:'-10px'}}
      />
        {
          props.name.length > 20 ? props.name.substring(0,20) + "..."
          :
          props.name
        }
      <SettingsIcon
        fontSize="small"
        style={{
          float:'right',
          position:'relative',
          top:'7px',
          marginRight:'10px'
        }}
        onClick={props.handleProjectEdit}
      /></li>
  )
}

export default ProjectList;
