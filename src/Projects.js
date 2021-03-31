import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar'
import FloatTaskBar from './components/floatBar/FloatTaskBar'
import FloatDeleteTask from './components/floatDelete/FloatTaskDelete'
import FloatNote from './components/floatNote/FloatNote'
import FloatProject from './components/floatProject/FloatProject.js'
import api from './api';
import Main from './components/main/Main'

//136

const Projects = (props) => {
  const USER = props.match.params.user_id

  const [selectedProject, setSelectedProject] = useState(0);
  const [floatStatus, setFloatStatus] = useState('none');
  const [floatTaskDelete, setFloatTaskDelete] = useState('none');
  const [floatNote, setFloatNote] = useState('none');
  const [floatProject, setFloatProject] = useState('none');
  const [projectData, setProjectData] = useState([]);
  const [taskEdit, setTaskEdit] = useState(false);
  const [taskNote, setTaskNote] = useState(false);
  const [taskDelete, setTaskDelete] = useState(false);
  const [projectMain, setProjectMain] = useState(false);
  const [taskId, setTaskId] = useState();

  useEffect(()=>{
    api.get(`projects-user/${USER}`)
    .then(res=>{
      setProjectData(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })

    if(props.match.path.substr(props.match.path.length - 7) === "addtask"){
      setFloatStatus('')
    }
  },[]);

  useEffect(()=>{
    if(props.match.path.substr(props.match.path.length - 7) === "addtask"){
      setFloatStatus('')
    }
  },[props.match.path])

   // console.log("ProjectData, ", props.match.params.project_id);

  useEffect(()=>{
    setSelectedProject(props.match.params.project_id)
  },[props.match.params.project_id])

  const closeFloatTaskBar = () => {
    setFloatStatus('none');
    setTaskId();
    setTaskEdit(false);
  }
  const closeFloatTaskDelete = () => {
    setFloatTaskDelete('none');
    setTaskId();
    setTaskDelete(false);
  }

  const closeFloatNote = () => {
    setFloatNote('none');
    setTaskId();
    setTaskNote(false);
  }
  const closeFloatProject= () => {
    setFloatProject('none');
    setProjectMain(false);
  }

  // const showFloatTaskBar = () => {
  //   if(selectedProject.length > 0) setFloatStatus('');
  // }

  const handleTaskEdit = (id) => {
    // console.log("Clicked edit", id);
    setTaskEdit(true);
    setTaskId(id);
    setFloatStatus('');
  }

  const handleTaskNote = (id) => {
    // console.log("Clicked note", id);
    setTaskNote(true);
    setFloatNote('');
    setTaskId(id);
  }
  const handleTaskDelete = (id) => {
    // console.log("Clicked delete", id);
    setTaskDelete(true);
    setFloatTaskDelete('');
    setTaskId(id);
  }
  const handleProject = () => {
    // console.log("Clicked delete", id);
    setProjectMain(true);
    setFloatProject('');
  }

  return (
    <div className="app" data-test="component-app">
      <Sidebar
        projectData={projectData}
        handleProject={handleProject}
        user={USER}
      />
      <Main
        selectedProject={selectedProject}
        user={USER}
        floatStatus={floatStatus}
        handleTaskEdit={handleTaskEdit}
        handleTaskNote={handleTaskNote}
        handleTaskDelete={handleTaskDelete}
        taskDelete={taskDelete}
      />
      <FloatTaskBar
        floatStatus={floatStatus}
        closeFloatTaskBar={closeFloatTaskBar}
        selectedProject={selectedProject}
        user={USER}
        edit={taskEdit}
        taskId={taskId}
      />
      <FloatDeleteTask
        closeFloatTaskDelete={closeFloatTaskDelete}
        floatTaskDelete={floatTaskDelete}
        selectedProject={selectedProject}
        user={USER}
        taskId={taskId}
      />
      <FloatNote
        closeFloatNote={closeFloatNote}
        floatNote={floatNote}
        selectedProject={selectedProject}
        user={USER}
        taskId={taskId}
      />
      <FloatProject
        closeFloatProject={closeFloatProject}
        floatProject={floatProject}
        selectedProject={selectedProject}
        user={USER}
      />

    </div>
  );
}

export default Projects;
