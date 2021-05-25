import React, {useEffect, useState} from 'react';
import UserSelect from "./UserSelect";
import Button from '@material-ui/core/Button';
import api from '../../api';
import "./floatbar.css";
import { authHeaders } from '../../authUtils';

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
    project_id: props.selectedProject[1],
    name:"",
    due_date: Date.now(),
    status:"New",
    progress:5,
    category:"",
    description:"",
    assignees:[]
  })
  const [formName, setFormName] = useState("");
  const [statusChange, setStatusChange] = useState("");
  const [progressChange, setProgressChange] = useState(5);
  const [categoryChange, setCategoryChange] = useState("");
  const [descriptionChange, setDescriptionChange] = useState("");
  const [assigneesChange, setAssigneesChange] = useState([]);
  const [taskCategories, setTaskCategories] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(()=>{
    // let isCancelled = false;
    setSelectedDate(Date.now());
    setFormDetails({
      project_id: props.selectedProject[1],
      name:"",
      due_date: "",
      status:"New",
      progress:5,
      category:"",
      description:"",
      assignees:[]
    });
    setFormName("");
    setStatusChange("");
    setProgressChange(5);
    setCategoryChange("");
    setDescriptionChange("");
    setAssigneesChange([]);
    // setUsers([])
    return () => {
      // isCancelled = true;
    };
  },[props.floatStatus])

  useEffect(()=>{
    api.get(`/task-categories-all`,{
      headers: authHeaders()
    })
    .then(res=>{
        setTaskCategories(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })
  },[props.floatStatus])

  const handleDateChange = (date) => {
    console.log(date.getTime());
    setSelectedDate(date.getTime());
    formDetails.due_date = date.getTime();
  };

  const percentage = () => {
    const arr = [];
    for( let i = 1; i <= 100; i++ ){
      if(i % 5 === 0) arr.push(i);
    }
    return arr;
  }

  //Edit assignees
    const handleRemoveAssignee = (index) => {
      const newArr = [...assigneesChange];
      newArr.splice(index,1);
      setAssigneesChange(newArr);
      const idArray = []
      for(let i = 0; i < newArr.length;i++){
        idArray.push(newArr[i].id);
      }
      const newFormDetails = formDetails;
      newFormDetails.assignees = idArray;
      setFormDetails(newFormDetails);
    }
    const handleSelected = (value) => {
      setSelected(value);
    }

    const handleAddAssignee = (id) => {

      setSelected("");

      api.get(`/user-one/${id}`,{
        headers: authHeaders()
      })
      .then(res=>{
        setAssigneesChange([...assigneesChange,res.data]);
        const newFormDetails = formDetails;
        newFormDetails.assignees.push(res.data.id);
        setFormDetails(newFormDetails);
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

  const saveData = (e) => {
    // console.log("Before submit: ", formDetails );
    api.post(`/task-create`,formDetails,{
      headers: authHeaders()
    })
    .then(res=>{
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
                 style:{
                   backgroundColor:"#FFFFFF",
                   marginTop:'25px'
                 }
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
            <select onChange={handleCategoryChange} value={categoryChange[0]}>
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
          <UserSelect
            handleSelected={handleSelected}
            selected={selected}
            assignees={assigneesChange}
            handleRemoveAssignee={handleRemoveAssignee}
            handleAddAssignee={handleAddAssignee}
          />

          <Button
            onClick={saveData}
            variant="contained"
            color="primary"
            style={{
              position: "relative",
              left: "5px",
              width: "300px",
              borderRadius: "0",
              color: "#FFFFFF",
              marginTop: "30px",
              marginBottom: "10px"
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
