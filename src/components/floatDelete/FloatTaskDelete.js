import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import "./floatdeletetask.css";

const FloatTaskDelete = (props) => {
  return(
    <div
      className="floatdeletetask"
      style={{
      display:props.floatTaskDelete
    }}
    >
      <CloseIcon
        onClick={props.closeFloatTaskDelete}
        fontSize="medium"
        style={{
          position:'absolute',
          right: '0px',
          color:'#000000',
          marginTop: '20px',
          marginRight:'20px'
        }}/>
    </div>
  )
}

export default FloatTaskDelete;
