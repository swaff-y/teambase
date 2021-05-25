import React, {useEffect, useState} from 'react';
import Sidebar from './components/sidebar/Sidebar'
import FloatTaskBar from './components/floatBar/FloatTaskBar'
import FloatDeleteTask from './components/floatDelete/FloatTaskDelete'
import FloatNote from './components/floatNote/FloatNote'
import FloatProject from './components/floatProject/FloatProject'
import Main from './components/main/Main'
import {Helmet} from 'react-helmet'
import { useHistory, useParams } from "react-router-dom";

// const USER = localStorage.user

const Projects = (props) => {
  const history = useHistory();
  let params = useParams();

  console.log("JWT", localStorage.jwt);

  useEffect(()=>{
    if(localStorage.jwt === ""){
      history.push("/");
    }
  },[])

  return (
    <div className="app" data-test="component-app">
      <Helmet>
        <title>Teambase - Projects</title>
          <meta name="description" content="Project tool" />
      </Helmet>
      <Sidebar
        selectedProject={props.project}
        projectData={props.projectData}
        handleProjectAdd={props.handleProjectAdd}
        handleProjectEdit={props.handleProjectEdit}
        user={props.user}
      />
      <Main
        selectedProject={props.selectedProject}
        showFloatTaskBar={props.showFloatTaskBar}
        floatStatus={props.floatStatus}
        handleTaskEdit={props.handleTaskEdit}
        handleTaskNote={props.handleTaskNote}
        handleTaskDelete={props.handleTaskDelete}
        taskDelete={props.taskDelete}
        user={props.user}
      />
      <FloatTaskBar
        floatStatus={props.floatStatus}
        closeFloatTaskBar={props.closeFloatTaskBar}
        selectedProject={props.selectedProject}
        user={props.user}
        edit={props.taskEdit}
        taskId={props.taskId}
      />
      <FloatDeleteTask
        closeFloatTaskDelete={props.closeFloatTaskDelete}
        floatTaskDelete={props.floatTaskDelete}
        selectedProject={props.selectedProject}
        user={props.user}
        taskId={props.taskId}
      />
      <FloatNote
        closeFloatNote={props.closeFloatNote}
        floatNote={props.floatNote}
        selectedProject={props.selectedProject}
        user={props.user}
        taskId={props.taskId}
      />
      <FloatProject
        closeFloatProject={props.closeFloatProject}
        floatProject={props.floatProject}
        selectedProject={props.selectedProject}
        user={props.user}
        edit={props.projectEdit}
      />

    </div>
  );
}
export default Projects;
