import React, {useEffect, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import "./floatbar.css";

const FloatTaskBar = (props) => {


  return(
    <div className="floatbar" style={{display:props.floatStatus}}>
      <h1 className="floatbar__heading">Add Task</h1>
      <CloseIcon onClick={props.closeFloatTaskBar} fontSize="medium" style={{position:'absolute', right: '0px', color:'#000000',marginTop: '-100px', marginRight:'20px'}}/>

      <div className="floatbar__container">
        <form>
          <div className="floatbar__row">
            <label for="taskName">Task Name</label><br/>
            <input id="taskName" type="text" name="taskName" placeholder="Task Name"/>
          </div>
          <div className="floatbar__row">
            <label for="dueDate">Due Date</label><br/>
            <input id="dueDate" type="text" name="dueDate"/>
          </div>
          <div className="floatbar__row">
            <div className="floatbar__col">
              <label for="status">Status</label><br/>
              <select>
                <option></option>
                <option>In Progress</option>
              </select>
            </div>
            <div className="floatbar__col">
              <label for="progress">Progress</label><br/>
              <select>
                <option></option>
                <option>Test</option>
              </select>
            </div>
            <div className="floatbar__col">
              <label for="category">Category</label><br/>
              <select>
                <option></option>
                <option>Test</option>
              </select>
            </div>
          </div>
          <div className="floatbar__row">
            <label for="des">Description</label><br/>
            <textarea id="des"></textarea>
          </div>
          <div className="floatbar__row assignees">
            <label for="des">Assignees</label><br/>
            <div className="floatbar__assignees">
            </div>
            <AddCircleOutlineIcon fontSize="small" style={{position: "relative", marginTop:'10px', left: "280px",}}/>
          </div>
          <div className="floatbar__row">
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FloatTaskBar;
