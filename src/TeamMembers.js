import React, {useEffect, useState} from 'react';
import "./team_members.css";
import {Helmet} from 'react-helmet'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'

const TeamMembers = (props) => {
  return(
    <div className="app">
      <Helmet>
        <title>Teambase - Team Members</title>
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

export default TeamMembers;
