import logo from './logo.svg';
import './app.css';
import React, {useEffect, useState} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar'
import FloatTaskBar from './components/floatBar/FloatTaskBar'
import Main from './components/main/Main'

const USER = 101;

function App() {
  const [selectedProject, setSelectedProject] = useState([]);
  const [floatStatus, setFloatStatus] = useState('none');

  const project = (projectName,projectId) => {
    setSelectedProject([projectName, projectId]);
  };

  const closeFloatTaskBar = () => {
    setFloatStatus('none');
  }
  const showFloatTaskBar = () => {
    setFloatStatus('');
  }

  return (
    <div className="app" data-test="component-app">
      <Sidebar selectedProject={project} user={USER}/>
      <Main selectedProject={selectedProject} showFloatTaskBar={showFloatTaskBar}/>
      <FloatTaskBar floatStatus={floatStatus} closeFloatTaskBar={closeFloatTaskBar}/>
    </div>
  );
}

export default App;
