import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import api from '../../../api';
import "./content.css";
import { authHeaders } from '../../../authUtils';

const FilterBar = (props) => {
  const [selectedProject, setSelectedProject] = useState({tasks:[{name:"default"}]});

  useEffect(()=>{
    api.get(`project-user/${props.selectedProject[1]}`,{
      headers: authHeaders()
    })
    .then(res=>{
      if(res.data !== null){
        setSelectedProject(res.data);
      }
    })
    .catch(err=>{
      console.warn(err);
    })
  },[
      props.selectedProject,
      props.floatStatus,
      props.taskDelete
    ]);

  const handleClickNew = () => {
    props.filterSelect("New")
  }
  const handleClickInProgress = () => {
    props.filterSelect("In Progress")
  }
  const handleClickComplete = () => {
    props.filterSelect("Complete")
  }

  const newCount = (data) => {
    let count = 0;
    for(let i = 0; i < data.length; i++){
      if(data[i].status === "New") count++;
    }
    return count;
  }
  const inProgressCount = (data) => {
    let count = 0;
    for(let i = 0; i < data.length; i++){
      if(data[i].status === "In Progress") count++;
    }
    return count;
  }
  const completeCount = (data) => {
    let count = 0;
    for(let i = 0; i < data.length; i++){
      if(data[i].status === "Complete") count++;
    }
    return count;
  }

  const statusCheckNew = () => {
    if(props.filterSelection === "New"){
      return {
        backgroundColor: "#9E9999",
        color: "#FFFFFF",
      }
    }
  }
  const statusCheckNewBorder = () => {
    if(props.filterSelection === "New"){
      return {
        borderBottom: "3px solid #6686CC",
      }
    }
  }
  const statusCheckInProgress = () => {
    if(props.filterSelection === "In Progress"){
      return {
        backgroundColor: "#9E9999",
        color: "#FFFFFF"
      }
    }
  }
  const statusCheckInProgressBorder = () => {
    if(props.filterSelection === "In Progress"){
      return {
        borderBottom: "3px solid #6686CC",
      }
    }
  }
  const statusCheckComplete = () => {
    if(props.filterSelection === "Complete"){
      return {
        backgroundColor: "#9E9999",
        color: "#FFFFFF"
      }
    }
  }
  const statusCheckCompleteBorder = () => {
    if(props.filterSelection === "Complete"){
      return {
        borderBottom: "3px solid #6686CC",
      }
    }
  }
  const checkProject = () => {
    let style = {};
    if(props.selectedProject.length < 1){
      style = {
        borderRadius: "0",
        color: "#FFFFFF",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        float: "right",
        height: "100%",
        width: "150px",
        backgroundColor: '#bdc7de',
      }
    }else{
      style = {
        borderRadius: "0",
        color: "#FFFFFF",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        float: "right",
        height: "100%",
        width: "150px"
      }
    }
    return style;
  }

  return(
    <div className="content__filterBar">
      <div className="content__filterBarFilters">
        <span id="firstFilter" onClick={handleClickNew} style={statusCheckNewBorder()}>
          New
          <div className="content__filterbarCircle" style={ statusCheckNew()}>{newCount(selectedProject.tasks)}</div>
        </span>

        <span id="secondFilter" onClick={handleClickInProgress} style={statusCheckInProgressBorder()}>
          In Progress
          <div className="content__filterbarCircle" style={ statusCheckInProgress()}>{inProgressCount(selectedProject.tasks)}</div>
        </span>
        <span id="thirdFilter" onClick={handleClickComplete} style={statusCheckCompleteBorder()}>
          Completed
          <div className="content__filterbarCircle" style={ statusCheckComplete()}>{completeCount(selectedProject.tasks)}</div>
        </span>
      </div>

      <Button
        onClick={props.showFloatTaskBar}
        variant="contained"
        color="primary"
        style={checkProject()}
      >
      New Task
      </Button>
    </div>
  )
}

export default FilterBar;

// <div
//   className="content__newTaskButton"
//   onClick={props.showFloatTaskBar}
//   style={checkProject()}
// >
//   <p>New Task</p>
// </div>
