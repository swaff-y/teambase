import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FloatTaskAdd from './FloatTaskAdd';
import FloatTaskEdit from './FloatTaskEdit';
import api from '../../api';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import "./floatbar.css";

const FloatTaskBar = (props) => {


  return(
    <div
      className="floatbar"
      style={{
      display:props.floatStatus
    }}>
      {
        props.edit === true
        ?
        <h1 className="floatbar__heading">Edit Task</h1>
        :
        <h1 className="floatbar__heading">Add Task</h1>
      }


      <CloseIcon
        onClick={props.closeFloatTaskBar}
        fontSize="medium"
        style={{
          position:'absolute',
          right: '0px',
          color:'#000000',
          marginTop: '-60px',
          marginRight:'20px'
        }}/>

      {
        props.edit === true
        ?
        <FloatTaskEdit />
        :
        <FloatTaskAdd
          floatStatus={props.floatStatus}
          closeFloatTaskBar={props.closeFloatTaskBar}
          selectedProject={props.selectedProject}
          user={props.user}
        />
      }


    </div>
  )
}

export default FloatTaskBar;
