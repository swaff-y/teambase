import React, {useEffect, useState} from 'react';
import Header from './header/Header'
import Content from './content/Content'
import "./main.css";

const Main = (props) => {
  return(
    <div className="main" data-test="component-main">
      <Header
        selectedProject={props.selectedProject}
      />
      <Content
      user={props.user}
        selectedProject={props.selectedProject} showFloatTaskBar={props.showFloatTaskBar}
        floatStatus={props.floatStatus}
        handleTaskEdit={props.handleTaskEdit}
        handleTaskNote={props.handleTaskNote}
        handleTaskDelete={props.handleTaskDelete}
        taskDelete={props.taskDelete}
      />
    </div>
  )
}

export default Main;
