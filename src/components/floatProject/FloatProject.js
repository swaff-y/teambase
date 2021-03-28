import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import "./floatproject.css";

const FloatProject = (props) => {
  return(
    <div
      className="floatproject"
      style={{
        display:props.floatProject
      }}
    >
      <IconButton
        onClick={props.closeFloatProject}
        style={{
          position:'absolute',
          right: '0px',
          color:'##6686CC',
          marginTop: '20px',
          marginRight:'20px'
        }}
      >
        <CloseIcon

          fontSize="small"
          style={{
            color:'#000000',
          }}/>
      </IconButton>
    </div>
  )
}

export default FloatProject;
