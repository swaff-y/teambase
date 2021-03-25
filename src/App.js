import logo from './logo.svg';
import './app.css';
import React, {useEffect, useState} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar'
import FloatTaskBar from './components/floatBar/FloatTaskBar'
import FloatDeleteTask from './components/floatDelete/FloatTaskDelete'
import api from './api';
import Main from './components/main/Main'

const USER = 101;

function App() {
  const [selectedProject, setSelectedProject] = useState([]);
  const [floatStatus, setFloatStatus] = useState('none');
  const [projectData, setProjectData] = useState([]);
  const [taskEdit, setTaskEdit] = useState(false);
  const [taskNote, setTaskNote] = useState(false);
  const [taskDelete, setTaskDelete] = useState(false);
  const [taskId, setTaskId] = useState();

  useEffect(()=>{
    api.get(`projects-user/${USER}`)
    .then(res=>{
      setProjectData(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })
  },[]);

  const project = (projectName,projectId) => {
    setSelectedProject([projectName, projectId]);
  };

  const closeFloatTaskBar = () => {
    setFloatStatus('none');
    setTaskId();
    setTaskEdit(false);
  }
  const showFloatTaskBar = () => {
    if(selectedProject.length > 0) setFloatStatus('');
  }

  const handleTaskEdit = (id) => {
    // console.log("Clicked edit", id);
    setTaskEdit(true);
    setTaskId(id);
    setFloatStatus('');
  }
  const handleTaskNote = (id) => {
    // console.log("Clicked note", id);
    setTaskNote(true);
    setTaskId(id);
  }
  const handleTaskDelete = (id) => {
    // console.log("Clicked delete", id);
    setTaskDelete(true);
    setTaskId(id);
  }

  return (
    <div className="app" data-test="component-app">
      <Sidebar
        selectedProject={project}
        projectData={projectData}
      />
      <Main
        selectedProject={selectedProject}
        showFloatTaskBar={showFloatTaskBar}
        floatStatus={floatStatus}
        handleTaskEdit={handleTaskEdit}
        handleTaskNote={handleTaskNote}
        handleTaskDelete={handleTaskDelete}
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

      />

    </div>
  );
}

export default App;
