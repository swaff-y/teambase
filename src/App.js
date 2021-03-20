import logo from './logo.svg';
import './app.css';
import React, {useEffect, useState} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import {IconButton} from '@material-ui/core';
import Toc from '@material-ui/icons/Toc';
import Sidebar from './components/sidebar/Sidebar'
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
    </div>
  );
}

export default App;
