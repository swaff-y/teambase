import logo from './logo.svg';
import './app.css';
import React, {useEffect, useState} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar'
import FloatTaskBar from './components/floatBar/FloatTaskBar'
import api from './api';
import Main from './components/main/Main'

const USER = 101;

function App() {
  const [selectedProject, setSelectedProject] = useState([]);
  const [floatStatus, setFloatStatus] = useState('none');
  const [projectData, setProjectData] = useState([]);

  useEffect(()=>{
    api.get(`projects-user/${USER}`)
    .then(res=>{
      setProjectData(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })
  },[floatStatus]);

  const project = (projectName,projectId) => {
    setSelectedProject([projectName, projectId]);
  };

  const closeFloatTaskBar = () => {
    setFloatStatus('none');
  }
  const showFloatTaskBar = () => {
    if(selectedProject.length > 0) setFloatStatus('');
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
      />
      <FloatTaskBar
        floatStatus={floatStatus}
        closeFloatTaskBar={closeFloatTaskBar}
        selectedProject={selectedProject}
      />
    </div>
  );
}

export default App;
