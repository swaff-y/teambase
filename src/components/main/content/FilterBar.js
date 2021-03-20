import React, {useEffect, useState} from 'react';
import api from '../../../api';
import "./content.css";

const FilterBar = (props) => {
  const [selectedProject, setSelectedProject] = useState({tasks:[{name:"default"}]});

  useEffect(()=>{
    api.get(`project-user/${props.selectedProject[1]}`)
    .then(res=>{
      if(res.data !== null){
        setSelectedProject(res.data);
      }
    })
    .catch(err=>{
      console.warn(err);
    })
  },[props.selectedProject]);

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
        color: "#FFFFFF"
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
  const statusCheckComplete = () => {
    if(props.filterSelection === "Complete"){
      return {
        backgroundColor: "#9E9999",
        color: "#FFFFFF"
      }
    }
  }

  return(
    <div className="content__filterBar">
      <div className="content__filterBarFilters">
        <span id="first" onClick={handleClickNew}>New <div className="content__filterbarCircle" style={ statusCheckNew()}>{newCount(selectedProject.tasks)}</div></span>
        <span onClick={handleClickInProgress}>In Progress <div className="content__filterbarCircle" style={ statusCheckInProgress()}>{inProgressCount(selectedProject.tasks)}</div></span>
        <span onClick={handleClickComplete}>Completed <div className="content__filterbarCircle" style={ statusCheckComplete()}>{completeCount(selectedProject.tasks)}</div></span>
      </div>
      <div className="content__newTaskButton">
        <p>New Task</p>
      </div>
    </div>
  )
}

export default FilterBar;
