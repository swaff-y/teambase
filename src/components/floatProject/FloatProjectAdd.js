import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import UserSelect from "../floatBar/UserSelect";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import "./floatproject.css";
import api from '../../api';
import { authHeaders } from '../../authUtils';

const FloatProjectAdd = (props) => {

  const [formName ,setFormName] = useState("");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [progressChange, setProgressChange] = useState(5);
  const [projectCategories ,setProjectCategories] = useState([]);
  const [categoryChange ,setCategoryChange] = useState([]);
  const [descriptionChange ,setDescriptionChange] = useState("");
  const [assigneesChange, setAssigneesChange] = useState([]);
  const [selected, setSelected] = useState('');
  const [statusChange, setStatusChange] = useState('');
  const [style, setStyle] = useState({
    width:"310px"
  });

  const [formDetails ,setFormDetails] = useState({
    name: "",
    status: "",
    progress: "",
    status: "",
    category:"",
    description: "",
    due_date: Date.now(),
    assignees: []
  });

  useEffect(()=>{
    setSelectedDate(Date.now());
    setFormDetails({
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
    setCategoryChange([]);
    setDescriptionChange("");
    setAssigneesChange([]);
    // setUsers([])
    return () => {
      // isCancelled = true;
    };
  },[props.floatStatus])

  useEffect(()=>{
    api.get(`/project_categories.json`,{
      headres: authHeaders()
    })
    .then(res=>{
        setProjectCategories(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })
  },[props.floatStatus])

  const handleProjectNameChange = (e) => {
    setFormName(e.target.value);
    const newFormDetails = formDetails;
    newFormDetails.name = e.target.value;
    setFormDetails(newFormDetails);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newFormDetails = formDetails;
    newFormDetails.due_date = date;
    setFormDetails(newFormDetails);
  };

  const handleProgressChange = (e) => {
    setProgressChange(e.target.value);
    const newFormDetails = formDetails;
    newFormDetails.progress = e.target.value;
    setFormDetails(newFormDetails);
  }

  const percentage = () => {
    const arr = [];
    for( let i = 1; i <= 100; i++ ){
      if(i % 5 === 0) arr.push(i);
    }
    return arr;
  }

  const handleStatusChange = (e) => {
    setStatusChange(e.target.value);
    const newFormDetails = formDetails;
    newFormDetails.status = e.target.value;
    setFormDetails(newFormDetails);
  }

  const handleCategoryChange = (e) => {

    for( let i = 0; i < projectCategories.length; i++ ){
      if(projectCategories[i].id == e.target.value){
        setCategoryChange([projectCategories[i].id,projectCategories[i].name]);
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

      api.get(`/users/${id}.json`,{
        headres: authHeaders()
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

  const saveData = (e) => {
    // console.log("Before submit: ",formDetails);
    api.post(`/project-create/${props.user}`,formDetails,{
      headres: authHeaders()
    })
    .then(res=>{
        props.closeFloatProjectBar();
        setSelectedDate(Date.now());
        setFormDetails({
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
        setCategoryChange([]);
        setDescriptionChange("");
        setAssigneesChange([]);
    })
    .catch(err=>{
      console.warn(err);
    })
  }

  return(
    <div className="">

      <form onSubmit={(event)=>event.preventDefault()}>
        <div className="floatproject__row">
          <label htmlFor="taskName">Project Name</label><br/>
          <input
            id="taskName"
            type="text"
            name="projectName"
            placeholder="Project Name"
            onChange={handleProjectNameChange}
            value={formName}
          />
        </div>

        <div className="floatproject__row bigger">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
             <KeyboardDatePicker
              style={{
                width:"338px",
                left:'-15px'
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

      <div className="floatproject__row" id="date">
        <div className="floatproject__col">
          <label htmlFor="status">Status</label><br/>
          <select onChange={handleStatusChange} value={statusChange}>
            <option>New</option>
            <option>In Progress</option>
            <option>Complete</option>
          </select>
        </div>

        <div className="floatproject__col">
          <label htmlFor="progress">Progress</label><br/>
          <select
            onChange={handleProgressChange}
            value={progressChange}
          >
            <option>{progressChange}</option>
            {
              percentage().map((value,index)=>
              <option
                key={index}
                value={value}
              >
                {value}%
              </option>)
            }
          </select>
        </div>
        <div className="floatproject__col">
          <label htmlFor="category">Category</label><br/>
          <select onChange={handleCategoryChange} value={categoryChange[0]}>
            <option
              value={categoryChange[0]}
            >
              {
                categoryChange[1]
              }
            </option>
            {
              projectCategories.map((category, index)=>
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
        <div className="floatproject__row">
          <label htmlFor="des">Description</label><br/>
          <textarea id="des"
            onChange={handleDescriptionChange}
            value={descriptionChange}
          >
          </textarea>
        </div>

        <div className="floatproject__row assignees">
          <label htmlFor="des">Assignees</label><br/>
            <UserSelect
              handleSelected={handleSelected}
              selected={selected}
              assignees={assigneesChange}
              handleRemoveAssignee={handleRemoveAssignee}
              handleAddAssignee={handleAddAssignee}
              inStyle={style}
            />

            <Button
              onClick={saveData}
              variant="contained"
              color="primary"
              style={{
                position: "relative",
                left: "5px",
                width: "330px",
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

export default FloatProjectAdd;
