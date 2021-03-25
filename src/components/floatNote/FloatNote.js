import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import "./floatnote.css";

const FloatNote = (props) => {
  return(
    <div
      className="floatnote"
      style={{
        display:props.floatNote
      }}
    >

      <CloseIcon
        onClick={props.closeFloatNote}
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

export default FloatNote;
