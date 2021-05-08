import React, {useEffect, useState} from 'react';
import "./analytics.css";
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'
import FloatProject from './components/floatProject/FloatProject'
import {Helmet} from 'react-helmet'

const Analytics = (props) => {
  return(
    <div className="analytics">
    <Helmet>
      <title>Teambase - Analytics</title>
        <meta name="description" content="Team Members" />
    </Helmet>
    <Sidebar
      selectedProject={props.project}
      projectData={props.projectData}
      handleProjectAdd={props.handleProjectAdd}
      handleProjectEdit={props.handleProjectEdit}
    />
    <Main
      selectedProject={props.selectedProject}
      showFloatTaskBar={props.showFloatTaskBar}
      floatStatus={props.floatStatus}
      handleTaskEdit={props.handleTaskEdit}
      handleTaskNote={props.handleTaskNote}
      handleTaskDelete={props.handleTaskDelete}
      taskDelete={props.taskDelete}
    />
    </div>
  )
}

export default Analytics;
