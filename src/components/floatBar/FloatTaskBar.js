import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import "./floatbar.css";

const FloatTaskBar = (props) => {


  return(
    <div className="floatbar" style={{display:props.floatStatus}}>
      <h1 className="floatbar__heading">Add Task</h1>
      <CloseIcon onClick={props.closeFloatTaskBar} fontSize="medium" style={{position:'absolute', right: '0px', color:'#000000',marginTop: '-50px', marginRight:'20px'}}/>

      <div className="floatbar__container">
        <form>
          <div className="floatbar__row">
            <label for="taskName">Task Name</label><br/>
            <input id="taskName" type="text" name="taskName" placeholder="Task Name"/>
          </div>
          <div className="floatbar__row">
            <label for="taskName">Task Name</label><br/>
            <input id="taskName" type="text" name="taskName" placeholder="Task Name"/>
          </div>
          <div className="floatbar__row">
            <div className="floatbar__col">
              <label for="taskName">Task Name</label><br/>
              <input id="taskName" type="text" name="taskName" placeholder="Task Name"/>
            </div>
            <div className="floatbar__col">
              <label for="taskName">Task Name</label><br/>
              <input id="taskName" type="text" name="taskName" placeholder="Task Name"/>
            </div>
            <div className="floatbar__col">
              <label for="taskName">Task Name</label><br/>
              <input id="taskName" type="text" name="taskName" placeholder="Task Name"/>
            </div>
          </div>
          <div className="floatbar__row">
          </div>
          <div className="floatbar__row">
          </div>
          <div className="floatbar__row">
          </div>
        </form>
      </div>
    </div>
  )
}

export default FloatTaskBar;
