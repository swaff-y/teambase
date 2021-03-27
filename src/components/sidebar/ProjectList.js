import React, {useEffect, useState} from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from '@material-ui/icons/Settings';
import "./sidebar.css";

const ProjectList = (props) => {

  const handleClick = () => {
    props.handleClick(props.project.name,props.project.id);
  }

  return(
    <li onClick={handleClick}>
      <ArrowForwardIcon
      fontSize="small"
      style={{
        color:'white',
        position:'relative',
        top:'7px',
        left:'-10px'}}
      />
        {
          props.project.name
        }
      <SettingsIcon
        fontSize="small"
        style={{
          float:'right',
          position:'relative',
          top:'7px',
          marginRight:'10px'
        }}
      /></li>
  )
}

export default ProjectList;
