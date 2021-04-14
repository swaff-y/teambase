import React, {useEffect, useState} from 'react';
import UserSelect from "./UserSelect";
import Button from '@material-ui/core/Button';
import api from '../../api';
import "./floatbar.css";

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const FloatTaskAdd = (props) => {

  const [selectedDate, setSelectedDate] = useState(Date.now());
  // const [assigneeCount, setAssigneeCount] = useState(0);
  // const [users, setUsers] = useState([]);
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
  const [taskCategories, setTaskCategories] = useState([]);

  useEffect(()=>{
    let isCancelled = false;
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
    setAssigneesChange([""]);
    // setUsers([])
    return () => {
      // isCancelled = true;
    };
  },[props.floatStatus])

  // useEffect(()=>{
  //   api.get(`/users.json`)
  //   .then(res=>{
  //       setUsers(res.data);
  //   })
  //   .catch(err=>{
  //     console.warn(err);
  //   })
  // },[props.floatStatus])

  useEffect(()=>{
    api.get(`/task_categories.json`)
    .then(res=>{
        setTaskCategories(res.data);
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

  // const assigneesArr = () => {
  //   const arr = [];
  //   for( let i = 0; i <= assigneeCount; i++ ){
  //     arr.push(i);
  //   }
  //   return arr;
  // }
  //
  // const handleAddAssignee = () => {
  //   let count = assigneeCount + 1;
  //   setAssigneeCount(count);
  // }

  //Edit assignees
    const handleAddAssignee = () => {
      setAssigneesChange([...assigneesChange, {id:"",name:""}]);
    }

    const handleRemoveAssignee = (index) => {
      const newArr = [...assigneesChange];
      newArr.splice(index,1);
      setAssigneesChange(newArr);
    }

    const handleUpdateAssignee = (id) => {

      const idSplit = id.split(",");
      const newArr = [...assigneesChange];

      api.get(`/users/${idSplit[0]}.json`)
      .then(res=>{
        newArr[idSplit[1]] = res.data;
        setAssigneesChange(newArr);

      })
      .catch(err=>{
        console.warn(err);
      })
    }
  //Edit assignees

  const handleTaskNameChange = (e) => {
    setFormName(e.target.value);
    const newFormDetails = formDetails;
    newFormDetails.name = e.target.value;
    setFormDetails(newFormDetails);
  }
  const handleStatusChange = (e) => {
    setStatusChange(e.target.value);
    const newFormDetails = formDetails;
    newFormDetails.status = e.target.value;
    setFormDetails(newFormDetails);
  }
  const handleProgressChange = (e) => {
    setProgressChange(e.target.value);
    const newFormDetails = formDetails;
    newFormDetails.progress = e.target.value;
    setFormDetails(newFormDetails);
  }
  const handleCategoryChange = (e) => {

        for( let i = 0; i < taskCategories.length; i++ ){
          if(taskCategories[i].id == e.target.value){
            setCategoryChange([taskCategories[i].id,taskCategories[i].name]);
          };
        };
        const newFormDetails = formDetails;
        newFormDetails.category = e.target.value;
        setFormDetails(newFormDetails);
  }
  const handleDescriptionChange = (e) => {
    setDescriptionChange(e.target.value);
    const newFormDetails = formDetails;
    newFormDetails.description = e.target.value;
    setFormDetails(newFormDetails);
  }
  // const handleAssigneesChange = (e) => {
  //   // assigneesChange.pop();
  //   assigneesChange.push(e.target.value);
  //   // formDetails.assignees.pop();
  //   formDetails.assignees.push(e.target.value);
  // }

  const saveData = (e) => {

    api.post(`/task-create/${props.selectedProject[1]}`,formDetails)
    .then(res=>{
         console.log(res.data);
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
          <label htmlFor="taskName">Task Name</label><br/>
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
            <label htmlFor="status">Status</label><br/>
            <select
              onChange={handleStatusChange}
              value={statusChange}
            >
              <option>New</option>
              <option>In Progress</option>
              <option>Complete</option>
            </select>
          </div>
          <div className="floatbar__col">
            <label htmlFor="progress">Progress</label><br/>
            <select
              onChange={handleProgressChange}
              value={progressChange}
            >
              {
                percentage().map((value,index)=>
                <option
                  key={index}
                  value={value}
                >
                  {
                    value
                  }%
                </option>)
              }
            </select>
          </div>
          <div className="floatbar__col">
            <label htmlFor="category">Category</label><br/>
            <select onChange={handleCategoryChange} value={categoryChange}>
              <option></option>
              {
                taskCategories.map((category, index)=>
                  <option
                    key={index}
                    value={category.id}
                  >
                  {
                    category.name
                  }
                  </option>
                )
              }
            </select>
          </div>
        </div>
        <div className="floatbar__row">
          <label htmlFor="des">Description</label><br/>
          <textarea id="des"
            onChange={handleDescriptionChange}
            value={descriptionChange}>
          </textarea>
        </div>
        <div className="floatbar__row assignees">
          <label htmlFor="des">Assignees</label><br/>
          <ul>
            {
              assigneesChange.map((assignee, index)=>
              <UserSelect
                key={index}
                assignee={assignee}
                last={assigneesChange.length - 1}
                index={index}
                handleRemoveAssignee={handleRemoveAssignee}
                handleAddAssignee={handleAddAssignee}
                handleUpdateAssignee={handleUpdateAssignee}
              />
              )
            }
          </ul>
          <Button
            onClick={saveData}
            variant="contained"
            color="primary"
            style={{
              position: "relative",
              left: "-20px",
              width: "300px",
              borderRadius: "0",
              color: "#FFFFFF",
            }}
          >
          save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FloatTaskAdd;
