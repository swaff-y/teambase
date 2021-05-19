// import React, {useEffect, useState} from 'react';
import Header from './header/Header'
import Content from './content/Content'
import ContentAnalytics from './contentAnalytics/ContentAnalytics'
import ContentTeamMembers from './contentTeamMembers/ContentTeamMembers'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import "./main.css";

const Main = (props) => {
  const location = useLocation().pathname;
  const params = useParams();
  const history = useHistory();

  const getLocation = (location) => {
    const locationArray = location.split("/");
    // console.log("The location array: ", locationArray);
    return locationArray[1];
  }

  return(
    <div className="main" data-test="component-main">
      <Header
        selectedProject={props.selectedProject}
        user={params.user}
      />
      {
        getLocation(location) === "projects"
        ?
        <Content
          user={params.user}
          selectedProject={props.selectedProject}
          showFloatTaskBar={props.showFloatTaskBar}
          floatStatus={props.floatStatus}
          handleTaskEdit={props.handleTaskEdit}
          handleTaskNote={props.handleTaskNote}
          handleTaskDelete={props.handleTaskDelete}
          taskDelete={props.taskDelete}
        />
        :
        getLocation(location) === "analytics"
        ?
        <ContentAnalytics />
        :
        <ContentTeamMembers />
      }

    </div>
  )
}

export default Main;
