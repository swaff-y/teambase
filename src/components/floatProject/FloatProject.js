import React, {useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import FloatProjectEdit from "./FloatProjectEdit";
import FloatProjectAdd from "./FloatProjectAdd";

const FloatProject = (props) => {

  return(
    <div
      className="floatproject"
      style={{
        display:props.floatProject
      }}
    >
      {
        props.edit === true
        ?
        <h1 className="floatproject__heading">Edit Project</h1>
        :
        <h1 className="floatproject__heading">Add Project</h1>
      }
      <IconButton
        onClick={props.closeFloatProject}
        style={{
          position:'absolute',
          right: '0px',
          color:'##6686CC',
          marginTop: '-68px',
          marginRight:'20px'
        }}
      >
        <CloseIcon
          fontSize="small"
          style={{
            color:'#000000',
          }}/>
      </IconButton>

      {
        props.edit === true
        ?
        <FloatProjectEdit
          floatStatus={props.floatStatus}
          closeFloatProjectBar={props.closeFloatProject}
          user={props.user}
          projectID={props.selectedProject}
        />
        :
        <FloatProjectAdd
          floatStatus={props.floatStatus}
          closeFloatProjectBar={props.closeFloatProject}
          user={props.user}
        />
      }

    </div>
  )
}

export default FloatProject;
