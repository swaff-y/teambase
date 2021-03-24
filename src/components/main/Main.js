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
        selectedProject={props.selectedProject} showFloatTaskBar={props.showFloatTaskBar}
        floatStatus={props.floatStatus}
      />
    </div>
  )
}

export default Main;
