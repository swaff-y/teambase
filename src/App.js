import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import {Helmet} from 'react-helmet'
import Login from "./Login"
import Projects from "./Projects"
import Analytics from "./Analytics"
import TeamMembers from "./TeamMembers"
import api from './api';

const USER = 236;

const App = () => {
  const [selectedProject, setSelectedProject] = useState([]);
  const [floatStatus, setFloatStatus] = useState('none');
  const [floatTaskDelete, setFloatTaskDelete] = useState('none');
  const [floatNote, setFloatNote] = useState('none');
  const [floatProject, setFloatProject] = useState('none');
  const [projectData, setProjectData] = useState([]);
  const [taskEdit, setTaskEdit] = useState(false);
  const [taskDelete, setTaskDelete] = useState(false);
  const [taskId, setTaskId] = useState();
  const [projectEdit, setProjectEdit] = useState(false);

  useEffect(()=>{
    api.get(`projects-user/${USER}`)
    .then(res=>{
      if(res.data.length < 1){
        setProjectData(res.data);
      }else{
        const projectArray = res.data;
        const numbers = [];
        for( let i = 0; i < projectArray.length; i++ ){
          numbers.push(projectArray[i].priority)
        }
        numbers.sort(compareNumbers);
        //this is a O(n^2) --> refactor in the future
        const returnArray = [];
        for( let i = 0; i < numbers.length; i++ ){
          for( let j = 0; j < projectArray.length; j++ ){
            if(projectArray[j].priority === numbers[i]){
              returnArray.push(projectArray[j]);
            }
          }
        }
        setProjectData(returnArray);
      }
    })
    .catch(err=>{
      console.warn(err);
    })
  },[floatProject]);

  const compareNumbers = (num1,num2) => {
     return num1 - num2;
  }

  const project = (projectName,projectId) => {
    setSelectedProject([projectName, projectId]);
  };

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
    setTaskId()
  }
  const closeFloatProject = () => {
    setFloatProject('none');
    setProjectEdit(false);
  }

  const showFloatTaskBar = () => {
    if(selectedProject.length > 0) setFloatStatus('');
  }

  const handleTaskEdit = (id) => {
    setTaskEdit(true);
    setTaskId(id);
    setFloatStatus('');
  }
  const handleTaskNote = (id) => {
    setFloatNote('');
    setTaskId(id);
  }
  const handleTaskDelete = (id) => {
    setTaskDelete(true);
    setFloatTaskDelete('');
    setTaskId(id);
  }
  const handleProjectEdit = () => {
    setProjectEdit(true);
    setFloatProject('');
  }
  const handleProjectAdd = () => {
    setProjectEdit(false);
    setFloatProject('');
  }

  return (
    <div className="app" data-test="component-app">
      <Helmet>
        <title>Teambase - Team project organisation tool</title>
          <meta name="description" content="A tool desiged with team colaboration for on time project delivery" />
      </Helmet>

      <Router>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/projects/:user">
          <Projects
            project={project}
            selectedProject={selectedProject}
            floatStatus={floatStatus}
            floatTaskDelete={floatTaskDelete}
            floatNote={floatNote}
            floatProject={floatProject}
            projectData={projectData}
            taskEdit={taskEdit}
            taskDelete={taskDelete}
            taskId={taskId}
            projectEdit={projectEdit}
            closeFloatTaskBar={closeFloatTaskBar}
            closeFloatTaskDelete={closeFloatTaskDelete}
            closeFloatNote={closeFloatNote}
            closeFloatProject={closeFloatProject}
            showFloatTaskBar={showFloatTaskBar}
            handleTaskEdit={handleTaskEdit}
            handleTaskNote={handleTaskNote}
            handleTaskDelete={handleTaskDelete}
            handleProjectEdit={handleProjectEdit}
            handleProjectAdd={handleProjectAdd}
          />
        </Route>
        <Route exact path="/analytics/:user">
          <Analytics
            project={project}
            projectData={projectData}
            handleProjectAdd={handleProjectAdd}
            handleProjectEdit={handleProjectEdit}
            closeFloatProject={closeFloatProject}
            floatProject={floatProject}
            selectedProject={selectedProject}
            projectEdit={projectEdit}
            showFloatTaskBar={showFloatTaskBar}
            floatStatus={floatStatus}
            handleTaskEdit={handleTaskEdit}
            handleTaskNote={handleTaskNote}
            handleTaskDelete={handleTaskDelete}
            taskDelete={taskDelete}
          />
        </Route>
        <Route path="/team_members/:user">
          <TeamMembers
            project={project}
            projectData={projectData}
            handleProjectAdd={handleProjectAdd}
            handleProjectEdit={handleProjectEdit}
            closeFloatProject={closeFloatProject}
            floatProject={floatProject}
            selectedProject={selectedProject}
            projectEdit={projectEdit}
            showFloatTaskBar={showFloatTaskBar}
            floatStatus={floatStatus}
            handleTaskEdit={handleTaskEdit}
            handleTaskNote={handleTaskNote}
            handleTaskDelete={handleTaskDelete}
            taskDelete={taskDelete}
          />
        </Route>
      </Router>
    </div>
  );
}

export default App;
