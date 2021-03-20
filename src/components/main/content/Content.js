import React, {useEffect, useState} from 'react';
import FilterBar from "./FilterBar";
import TaskBar from "./TaskBar";
import api from '../../../api';
import "./content.css";

const Content = (props) => {

  const [selectedProject, setSelectedProject] = useState([]);
  const [filterSelection, setFilterSelection] = useState("In Progress");
  // const [projectStatus, setProjectStatus] = useState("In Progress");

  useEffect(()=>{
    if(props.selectedProject[1] > 1){
      api.get(`project-user-status/${props.selectedProject[1]}/${filterSelection}`)
      .then(res=>{
        if(res.data !== null){
          setSelectedProject(res.data);
        }
      })
      .catch(err=>{
        console.warn(err);
      })
    }
  },[filterSelection,props.selectedProject[1]]);

  const filterSelect = (type) => {
    setFilterSelection(type);
  }
  // console.log(filterSelection)
  return(
    <div className="content" data-test="component-content">
      <div className="content__spacer"></div>
      <FilterBar filterSelect={filterSelect} selectedProject={props.selectedProject} filterSelection={filterSelection}/>
      <div className="content__headings">
        <span id="headerName">Task Name</span>
        <span id="headerStatus">Status</span>
        <span id="headerDueDate">Due Date</span>
        <span id="headerProgress">Progress</span>
        <span id="headerAssignees">Assignees</span>
      </div>
      <div className="content__spacer"></div>
      {
        selectedProject.map((task, index)=><TaskBar key={index} task={task}/>)
      }
    </div>
  )
}

export default Content;
