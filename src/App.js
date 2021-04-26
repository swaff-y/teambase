import './App.css';
import React, {useEffect, useState} from 'react';
// import { Route, HashRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar'
import FloatTaskBar from './components/floatBar/FloatTaskBar'
import FloatDeleteTask from './components/floatDelete/FloatTaskDelete'
import FloatNote from './components/floatNote/FloatNote'
import FloatProject from './components/floatProject/FloatProject.js'
import api from './api';
import Main from './components/main/Main'

const USER = 196;

function App() {
  const [selectedProject, setSelectedProject] = useState([]);
  const [floatStatus, setFloatStatus] = useState('none');
  const [floatTaskDelete, setFloatTaskDelete] = useState('none');
  const [floatNote, setFloatNote] = useState('none');
  const [floatProject, setFloatProject] = useState('none');
  const [projectData, setProjectData] = useState([]);
  const [taskEdit, setTaskEdit] = useState(false);
  // const [taskNote, setTaskNote] = useState(false);
  const [taskDelete, setTaskDelete] = useState(false);
  // const [projectMain, setProjectMain] = useState(false);
  const [taskId, setTaskId] = useState();

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
        console.log("The project data:",returnArray);
        setProjectData(returnArray);
      }
    })
    .catch(err=>{
      console.warn(err);
    })
  },[]);

  const compareNumbers = (num1,num2) => {
	   return num1 - num2; //switch around to change direction
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
    setTaskId();
    // setTaskNote(false);
  }
  const closeFloatProject= () => {
    setFloatProject('none');
    // setProjectMain(false);
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
    // setTaskNote(true);
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
    // setProjectMain(true);
    setFloatProject('');
  }

  return (
    <div className="app" data-test="component-app">
      <Sidebar
        selectedProject={project}
        projectData={projectData}
        handleProject={handleProject}
      />
      <Main
        selectedProject={selectedProject}
        showFloatTaskBar={showFloatTaskBar}
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

export default App;
