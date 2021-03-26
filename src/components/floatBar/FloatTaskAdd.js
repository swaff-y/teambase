import React, {useEffect, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import api from '../../api';
import "./floatbar.css";

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const FloatTaskAdd = (props) => {

  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [assigneeCount, setAssigneeCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [formDetails, setFormDetails] = useState({
    name:"",
    due_date: "",
    status:"New",
    progress:5,
    category:"",
    description:"",
    assignees:[props.user]
  })
  const [formName, setFormName] = useState("");
  const [statusChange, setStatusChange] = useState("");
  const [progressChange, setProgressChange] = useState(5);
  const [categoryChange, setCategoryChange] = useState("");
  const [descriptionChange, setDescriptionChange] = useState("");
  const [assigneesChange, setAssigneesChange] = useState([]);

  useEffect(()=>{
    setAssigneeCount(0);
    setSelectedDate(Date.now());
    setFormDetails({
      name:"",
      due_date: "",
      status:"New",
      progress:5,
      category:"",
      description:"",
      assignees:[props.user]
    });
    setFormName("");
    setStatusChange("");
    setProgressChange(5);
    setCategoryChange("");
    setDescriptionChange("");
    setAssigneesChange([]);
    setUsers([])
  },[props.floatStatus])

  useEffect(()=>{
    api.get(`/users.json`)
    .then(res=>{
        setUsers(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })
  },[props.floatStatus])

  const handleDateChange = (date) => {
    setSelectedDate(date);
    formDetails.due_date = date;
  };

  const percentage = () => {
    const arr = [];
    for( let i = 1; i <= 100; i++ ){
      if(i % 5 === 0) arr.push(i);
    }
    return arr;
  }

  const assigneesArr = () => {
    const arr = [];
    for( let i = 0; i <= assigneeCount; i++ ){
      arr.push(i);
    }
    return arr;
  }

  const handleAddAssignee = () => {
    let count = assigneeCount + 1;
    setAssigneeCount(count);
  }

  const handleTaskNameChange = (e) => {
    setFormName(e.target.value);
    formDetails.name = e.target.value;
  }
  const handleStatusChange = (e) => {
    setStatusChange(e.target.value);
    formDetails.status = e.target.value;
  }
  const handleProgressChange = (e) => {
    setProgressChange(e.target.value);
    formDetails.progress = e.target.value;
  }
  const handleCategoryChange = (e) => {
    setCategoryChange(e.target.value);
    formDetails.category = e.target.value;
  }
  const handleDescriptionChange = (e) => {
    setDescriptionChange(e.target.value);
    formDetails.description = e.target.value;
  }
  const handleAssigneesChange = (e) => {
    assigneesChange.pop();
    assigneesChange.push(e.target.value);
    formDetails.assignees.pop();
    formDetails.assignees.push(e.target.value);
  }

  const saveData = (e) => {

    api.post(`/task-create/${props.selectedProject[1]}`,formDetails)
    .then(res=>{
        // console.log(res.data);
        props.closeFloatTaskBar();
    })
    .catch(err=>{
      console.warn(err);
    })
  }

  return(
    <div className="floatbar__container">
      <form onSubmit={(event)=>event.preventDefault()}>
        <div className="floatbar__row">
          <label for="taskName">Task Name</label><br/>
          <input id="taskName" type="text" name="taskName" placeholder="Task Name" onChange={handleTaskNameChange} value={formName}/>
        </div>
        <div className="floatbar__row bigger">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
             <KeyboardDatePicker
              style={{
                width:"315px",
                left:'-5px'
              }}
               disableToolbar
               InputProps={{
                 disableUnderline: true,
                 style:{backgroundColor:"#FFFFFF",
                 marginTop:'25px'}
               }}
               variant="inline"
               format="yyyy-MM-dd"
               id="date-picker-inline"
               label="Due Date"
               value={selectedDate}
               onChange={handleDateChange}
               KeyboardButtonProps={{
                 'aria-label': 'change date',
               }}
             />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <div className="floatbar__row" id="date">
          <div className="floatbar__col">
            <label for="status">Status</label><br/>
            <select onChange={handleStatusChange} value={statusChange}>
              <option>New</option>
              <option>In Progress</option>
              <option>Complete</option>
            </select>
          </div>
          <div className="floatbar__col">
            <label for="progress">Progress</label><br/>
            <select onChange={handleProgressChange} value={progressChange}>
              {
                percentage().map((value,index)=>
                <option key={index} value={value}>
                  {value}%
                </option>)
              }
            </select>
          </div>
          <div className="floatbar__col">
            <label for="category">Category</label><br/>
            <select onChange={handleCategoryChange} value={categoryChange}>
              <option></option>
              <option>Test</option>
            </select>
          </div>
        </div>
        <div className="floatbar__row">
          <label for="des">Description</label><br/>
          <textarea id="des" onChange={handleDescriptionChange} value={descriptionChange}></textarea>
        </div>
        <div className="floatbar__row assignees">
          <label for="des">Assignees</label><br/>
            <ul>
              {
                assigneesArr().map((value,index)=>
                  <li>
                    <select onChange={handleAssigneesChange}>
                      <option></option>
                      {
                        users.map((user,index)=>
                        <option value={user.id}>{user.name}</option>
                        )
                      }
                    </select>
                  </li>
                )
              }
            </ul>
            {
              assigneeCount <= 8
              ?
              <AddCircleOutlineIcon
                onClick={handleAddAssignee}
                fontSize="small" style={{
                  position: "relative",
                  left: "280px",
                  top: "-58px"
              }}/>
              :
              <AddCircleOutlineIcon
              fontSize="small"
              style={{
                position: "relative",
                left: "280px", top: "-58px",
                color:"lightgrey"
              }}/>
            }
          <button id="saveButton" onClick={saveData}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default FloatTaskAdd;
