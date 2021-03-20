import React, {useEffect, useState} from 'react';
import "./projectTitle.css";

const ProjectTitle = (props) => {
  return(
    <div className="projectTitle">
      <h1>{props.selectedProject[0]}</h1>
    </div>
  )
}

export default ProjectTitle;
