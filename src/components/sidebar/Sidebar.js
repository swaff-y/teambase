import React, {useEffect, useState} from 'react';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ViewListIcon from '@material-ui/icons/ViewList';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PeopleIcon from '@material-ui/icons/People';
import api from '../../api';
import './sidebar.css'

const Sidebar = (props) => {
  const [projectData, setProjectData] = useState([]);
  const [projectShow, setProjectShow] = useState("hidden");

  useEffect(()=>{
    api.get('projects-user/96')
    .then(res=>{
      setProjectData(res.data);
    })
    .catch(err=>{
      console.warn(err);
    })

  },[]);

  // console.log(projectData);

  const projectShowToggle = () => {
    if(projectShow === ""){
      setProjectShow(true);
      return;
    }
    setProjectShow(false);
  }

  return(
    <div className="sidebar" data-test="component-sidebar">
      <div className="sideber__logo">
        <FilterHdrIcon fontSize="large" style={{marginTop:'15px', marginLeft: '100px', color: '#FFFFFF'}}/>
        <h1 className="sidebar__header">Teambase</h1>
      </div>
      <div className="sidebar__button">
        <p>New Project</p>
      </div>
      <div className="sidebar__projects">
        <ViewListIcon fontSize="medium" style={{marginLeft:'20px', color:'#FFFFFF'}} />
        <span>Projects</span>
        <ArrowForwardIosIcon fontSize="small" style={{position:'relative', top:'-1px', color: 'white', marginLeft:'90px'}} onClick={projectShowToggle()}/>
      </div>
      <div className="sidebar__projectsShow" style={{display:}}>
        <p>Hello</p>
      </div>
      <div className="sidebar__analytics">
        <InsertChartIcon fontSize="medium" style={{marginLeft:'20px', color:'#FFFFFF'}}/>
        <span>Analytics</span>
      </div>
      <div className="sidebar__teamMembers">
        <PeopleIcon fontSize="medium" style={{marginLeft:'20px', color:'#FFFFFF'}}/>
        <span>Team Members</span>
      </div>
    </div>
  )
}

export default Sidebar;
