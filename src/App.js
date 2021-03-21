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



  const project = (projectName,projectId) => {
    setSelectedProject([projectName, projectId]);
  };

  return (
    <div className="app" data-test="component-app">
      <Sidebar selectedProject={project} user={USER}/>
      <Main selectedProject={selectedProject}/>
      <FloatTaskBar />
    </div>
  );
}

export default App;
